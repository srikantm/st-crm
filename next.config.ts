import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output:"standalone",
    devIndicators: {
        appIsrStatus: false,
      },
};

export default nextConfig;
