/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ['www.redditstatic.com', 'external-preview.redd.it'],
    unoptimized: true,
  },
  // Note: API routes won't work with static export
  // We'll need to handle API calls differently
}

module.exports = nextConfig
