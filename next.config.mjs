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
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'via.assets.so',
                port: ''
            }
        ]
    },
    env: {
        WebSocket: {
            host: "localhost",
            port: '8100',
        }
    }
};

export default nextConfig;
