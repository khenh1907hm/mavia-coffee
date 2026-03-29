import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'soulcoffee.vn',
      },
      {
        protocol: 'https',
        hostname: 'sonpacamara.com',
      },
      {
        protocol: 'https',
        hostname: 'w.ladicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'fapwsqtxcrydiamyzxgt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      }
    ],
  },
};

export default nextConfig;
