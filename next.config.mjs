/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-southeast-1.amazonaws.com', // atau sesuaikan
      },
      {
        protocol: 'http',
        hostname: 'localhost', // atau sesuaikan
      },
    ],
  },
};

export default nextConfig;
