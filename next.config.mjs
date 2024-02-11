/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
      missingSuspenseWithCSRBailout: false,
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    }
};

export default nextConfig;
