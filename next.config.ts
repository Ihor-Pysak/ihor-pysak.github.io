import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — produces an ./out directory of plain HTML
  output: "export",
  // Required for `next export` since Next's default image optimizer needs a Node server
  images: { unoptimized: true },
  // Pages serves each route as a directory with index.html inside
  trailingSlash: true,
};

export default nextConfig;
