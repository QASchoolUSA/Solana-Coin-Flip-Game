import type { NextConfig } from "next";
require('dotenv').config();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_HOUSE_WALLET_SECRET: process.env.NEXT_PUBLIC_HOUSE_WALLET_SECRET,
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  }
};

export default nextConfig;
