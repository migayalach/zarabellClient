import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: "http://5.189.188.6:3001/zarabell/graphql",
      },
    ];
  },
};

export default nextConfig;