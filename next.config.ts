import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  devIndicators: {
    buildActivity: true,
    appIsrStatus: false,
  },
  images: {
    domains: [], // Add your image domains here if needed
    unoptimized: process.env.NODE_ENV === 'development',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
};

export default nextConfig;
