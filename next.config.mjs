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
  };