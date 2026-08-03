/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['mongoose'],
  async redirects() {
    return [
      // Nothing is sold here, so /pricing became /enrollment. Kept so older
      // links and bookmarks do not break.
      { source: '/pricing', destination: '/enrollment', permanent: true },
    ];
  },
};

export default nextConfig;
