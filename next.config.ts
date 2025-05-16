import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['picsum.photos', 'image.tmdb.org'],
  },
  swcMinify: true,  // SWC minification + transformation
};

export default nextConfig;
