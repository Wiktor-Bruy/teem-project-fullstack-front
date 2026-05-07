import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'teem-project-fullstack-back.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'maternity-tracker-api.onrender.com',
      },
    ],
  },
};

export default nextConfig;
