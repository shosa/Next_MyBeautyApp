import dotenv from 'dotenv';
import { parsed } from 'dotenv';

const env = dotenv.config({
  path: './.env'
});
export default {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  env: {
    DB_HOST: parsed.DB_HOST,
    DB_USER: parsed.DB_USER,
    DB_PASSWORD: parsed.DB_PASSWORD,
    DB_NAME: parsed.DB_NAME
  }
};