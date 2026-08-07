import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN / container origins to hit the dev server (local QA tooling).
  allowedDevOrigins: ["host.docker.internal", "192.168.56.1"],
};

export default nextConfig;
