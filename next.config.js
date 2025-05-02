/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
      serverActions: true, // only if you use server actions — safe to keep
    },
  };
  
  module.exports = nextConfig;
  