import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // FNN lives inside the escrow app's repo, which has its own lockfile; pin the root to this app.
    root: __dirname,
  },
};

export default nextConfig;
