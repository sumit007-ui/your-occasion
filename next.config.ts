import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/admin/leads',
        destination: '/admin/inquiries',
        permanent: true,
      },
      {
        source: '/admin/leads/:path*',
        destination: '/admin/inquiries/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
