/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "the-wild-oasis-cabins.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
