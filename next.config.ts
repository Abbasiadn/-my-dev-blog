import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This tells Next.js to build static HTML files
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimization
  },
  // Important: Change this to your actual GitHub repo name!
  basePath: '/my-dev-blog', 
  assetPrefix: '/my-dev-blog',
}

module.exports = nextConfig