/**
 * Simple sync script skeleton.
 * - Uses MARKET_API_BASE + MARKET_API_KEY when available
 * - Falls back to a tiny cheerio scraper example if not
 *
 * Configure DATABASE_URL and optionally MARKET_API_BASE, MARKET_API_KEY
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchFromApi() {
  if (!process.env.MARKET_API_BASE) return null;
  const url = process.env.MARKET_API_BASE + '/items';
  const headers = process.env.MARKET_API_KEY ? { Authorization: `Bearer ${process.env.MARKET_API_KEY}` } : {};
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error('Market API error: ' + r.status);
  return r.json();
}

async function scrapeExample() {
  // placeholder example — implement per target site and ToS
  const url = 'https://assets.tarkov.example/items-list'; // replace
  const r = await fetch(url);
  const html = await r.text();
  const $ = cheerio.load(html);
  const items = [];
  $('.item-row').each((i, el) => {
    const name = $(el).find('.title').text().trim();
    const price = parseInt($(el).find('.price').text().replace(/[^0-9]/g, '')) || 0;
    const id = $(el).attr('data-id') || name;
    items.push({ id, name, price, image: $(el).find('img').attr('src') });
  });
  return { items };
}

async function sync() {
  try {
    let data = await fetchFromApi();
    if (!data) {
      console.warn('No MARKET_API_BASE set — running scraper fallback (example).');
      data = await scrapeExample();
    }

    for (const it of data.items) {
      const up = await prisma.item.upsert({
        where: { tarkovId: String(it.id) },
        update: {
          name: it.name,
          imageUrl: it.image || null,
          lastPrice: it.price || null,
          avgPrice: it.avgPrice || null,
          lastUpdated: new Date()
        },
        create: {
          tarkovId: String(it.id),
          name: it.name,
          imageUrl: it.image || null,
          lastPrice: it.price || null,
          avgPrice: it.avgPrice || null
        }
      });

      if (it.price) {
        await prisma.priceHistory.create({
          data: { itemId: up.id, price: it.price, source: it.source || 'market' }
        });
      }
    }

    console.log('Sync completed. Items processed:', data.items.length);
    process.exit(0);
  } catch (err) {
    console.error('Sync error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) sync();
module.exports = { sync };
