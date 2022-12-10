/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer");
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "dics-bucket.s3.ap-northeast-2.amazonaws.com",
    ],
  },
  webpack5: true,
};

module.exports = withPlugins(
  [
    bundleAnalyzer,
    [
      withPWA,
      {
        pwa: {
          dest: "public",
        },
      },
    ],
  ],
  nextConfig
);
