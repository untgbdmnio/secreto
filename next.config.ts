import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options di sini */
  experimental: {
    serverActions: {
      allowedOrigins: [
        '9gbht5sd-3000.asse.devtunnels.ms', // URL Tunnel Anda
        'localhost:3000'
      ],
    },
  },
};

export default nextConfig;