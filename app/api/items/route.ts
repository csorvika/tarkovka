import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '24');
  const skip = (page - 1) * limit;

  const where = q ? { name: { contains: q, mode: 'insensitive' } } : {};

  const items = await prisma.item.findMany({
    where,
    take: limit,
    skip,
    orderBy: { name: 'asc' },
    include: { priceHistory: { take: 10, orderBy: { ts: 'desc' } } }
  });

  return NextResponse.json({ items });
}
