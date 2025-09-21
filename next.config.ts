import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output:"standalone",
    devIndicators: {
        appIsrStatus: false,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

export default nextConfig;
