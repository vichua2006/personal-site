/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // For static export (since you're deploying to Vercel)
  output: 'export',
  trailingSlash: true,
  
  // Image optimization needs to be disabled for static export
  images: {
    unoptimized: true
  },
  
  // Ensure public assets work correctly
  assetPrefix: undefined,
  
  // TypeScript and ESLint configurations
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
