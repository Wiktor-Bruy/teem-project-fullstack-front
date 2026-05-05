import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['teem-project-fullstack-back.onrender.com', 'ftp.goit.study'],
  },
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
};

export default nextConfig;
