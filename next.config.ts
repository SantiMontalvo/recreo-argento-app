import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/recreo-argento-app",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
