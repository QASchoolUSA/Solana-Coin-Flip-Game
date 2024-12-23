import type { NextConfig } from "next";
require('dotenv').config();

const nextConfig: NextConfig = {
  basePath: '/Solana-Coin-Flip-Game',
  assetPrefix: '/Solana-Coin-Flip-Game',
  env: {
    NEXT_PUBLIC_HOUSE_WALLET_SECRET: process.env.NEXT_PUBLIC_HOUSE_WALLET_SECRET,
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  }
};

export default nextConfig;
