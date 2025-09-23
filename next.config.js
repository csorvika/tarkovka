/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'assets.tarkov.example',
      'upload.wikimedia.org', // <-- Wikimedia képek
      'i.imgur.com'           // <-- ha Imgur-t is használnál
    ]
  }
}

module.exports = nextConfig
