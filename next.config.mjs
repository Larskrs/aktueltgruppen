/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'aktuelt.tv',
                port: ''
            }
        ]
    }
};

export default nextConfig;
