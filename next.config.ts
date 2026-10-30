import type { NextConfig } from "next";

// STATIC_PREVIEW=1 (scripts/build-preview.sh) builds a click-through preview that runs
// from any static host: no server, forms simulated, relative URLs.
const preview = process.env.STATIC_PREVIEW === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(preview
    ? {
        output: "export",
        assetPrefix: ".",
        images: { unoptimized: true },
      }
    : {}),
  async headers() {
    return [
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
