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
      }
    ],
  },
};

export default nextConfig;
