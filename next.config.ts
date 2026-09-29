import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/recreo-argento-app",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: "/recreo-argento-app",
  },
};

export default nextConfig;
