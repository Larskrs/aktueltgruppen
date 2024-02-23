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
    },
    env: {
        WebSocket: {
            host: "localhost",
            port: '3001',
        }
    }
};

export default nextConfig;
