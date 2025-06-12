import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['http2.mlstatic.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'simple.ripley.com.pe',
        pathname: '/home/_next/image**',
      },
      {
        protocol: 'https',
        hostname: 'api-pe.ripley.com',
        pathname: '/experience/ecommerce/rdex/api-image-interceptor/**',
      }
    ],
  },
};

export default nextConfig;