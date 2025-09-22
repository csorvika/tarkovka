/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ['res.cloudinary.com', 'assets.tarkov.example']
  }
}

module.exports = nextConfig
