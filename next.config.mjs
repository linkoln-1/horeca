/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: config => {
        config.resolve.fallback = { fs: false, net: false, tls: false }
        config.module.unknownContextCritical = false
        return config
    },
    reactStrictMode: false,
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
