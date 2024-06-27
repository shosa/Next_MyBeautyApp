import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
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
    // Configurazione per alias usando __dirname in modo corretto
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');

    // Disabilita il fallback per 'fs' sul lato client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  },
};

export default nextConfig;
