import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.2', '192.168.1.3', '*.local']
};

export default nextConfig;
