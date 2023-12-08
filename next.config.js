/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {},
  images: {
    domains: ["media.licdn.com"],
    // formats: ['image/avif', 'image/webp'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'media.licdn.com',
    //     // port: '',
    //     // pathname: '/image/upload/**',
    //   },
    // ],
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
