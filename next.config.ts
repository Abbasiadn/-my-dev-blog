// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/my-dev-blog',
  assetPrefix: '/my-dev-blog',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/my-dev-blog',
  },
};

export default nextConfig;