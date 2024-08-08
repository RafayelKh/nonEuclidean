/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: config => {
    return config
  },
}

export default nextConfig
