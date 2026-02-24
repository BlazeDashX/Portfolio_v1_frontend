import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};
module.exports = nextConfig;
export default nextConfig;