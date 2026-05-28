import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Gzip/Brotli compression for all responses
  compress: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media.beehiiv.com' },
      { protocol: 'https', hostname: 'cdn.beehiiv.com' },
      { protocol: 'https', hostname: 'substackcdn.com' },
      // Beehiiv S3 bucket — used for uploaded post thumbnails
      { protocol: 'https', hostname: 'beehiiv-images-production.s3.amazonaws.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    // Cache optimised images for 1 week on the CDN
    minimumCacheTTL: 604800,
  },

  // Aggressive caching headers for static assets
  async headers() {
    return [
      {
        // Immutable cache for Next.js hashed JS/CSS chunks
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 1-week cache for images in /public
        source: '/:path*.(png|jpg|jpeg|webp|avif|svg|ico|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

export default nextConfig
