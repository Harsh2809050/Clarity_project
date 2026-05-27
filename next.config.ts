import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media.beehiiv.com' },
      { protocol: 'https', hostname: 'cdn.beehiiv.com' },
      { protocol: 'https', hostname: 'substackcdn.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
