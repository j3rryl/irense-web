/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {},
  images: {
    domains: ["media.licdn.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
