/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const hostnames = [
  "res.cloudinary.com",
  "i.pravatar.cc",
  "images.unsplash.com",
  "avatars.githubusercontent.com",
  "brand.assets.adidas.com",
];

const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    mdxRs: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      pathname: "**",
    })),
  },
  transpilePackages: ["lucide-react"],
};
export default withNextIntl(nextConfig);
