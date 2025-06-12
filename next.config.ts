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
  typescript: {
    // Completamente ignora errores de TypeScript
    ignoreBuildErrors: true,
  },
  // También ignorar errores de ESLint si los tienes
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;