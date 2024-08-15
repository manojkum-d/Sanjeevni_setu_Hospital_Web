/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.cache = false;
  //   }
  //   return config;
  // },
  images: {
    domains: ["api.qrserver.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
