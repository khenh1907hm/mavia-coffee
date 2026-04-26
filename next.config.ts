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
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.vietqr.io',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      }
    ],
  },
};

export default nextConfig;
