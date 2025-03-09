/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oaidalleapicontent.blob.core.windows.net'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig; 