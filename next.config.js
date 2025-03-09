/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapicontent.blob.core.windows.net',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 