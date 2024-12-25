/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/Solana-Coin-Flip-Game' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Solana-Coin-Flip-Game' : '',
  env: {
    NEXT_PUBLIC_HOUSE_WALLET_SECRET: process.env.NEXT_PUBLIC_HOUSE_WALLET_SECRET,
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  },
  images: {
    unoptimized: true,
  },
  // This ensures that assets are served correctly on GitHub Pages
  output: 'export',
  // Disable server-side features since GitHub Pages is static
  trailingSlash: true,
};

export default nextConfig;
