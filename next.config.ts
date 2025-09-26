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
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't resolve 'fs', 'net', 'tls' modules on the client side
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                dns: false,
            };
        }
        return config;
    },
};

export default nextConfig;
