/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabling strict mode is often helpful when working with GSAP animations that attach to global windows or scroll triggers to prevent dual runs.
};

export default nextConfig;
