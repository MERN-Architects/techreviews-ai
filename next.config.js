/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'oaidalleapiprodscus.blob.core.windows.net', // For DALL·E generated images
      'images.unsplash.com', // For placeholder images
    ],
  },
};

module.exports = nextConfig; 