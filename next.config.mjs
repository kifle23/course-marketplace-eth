/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '/**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
        NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        NEXT_PUBLIC_ADMIN_ADDRESS_PROD: process.env.NEXT_PUBLIC_ADMIN_ADDRESS_PROD,
        NEXT_PUBLIC_ADMIN_ADDRESS_DEV: process.env.NEXT_PUBLIC_ADMIN_ADDRESS_DEV,
    },
};

export default nextConfig;
