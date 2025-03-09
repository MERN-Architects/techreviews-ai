/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['oaidalleapicontent.blob.core.windows.net'],
    unoptimized: true
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig; 