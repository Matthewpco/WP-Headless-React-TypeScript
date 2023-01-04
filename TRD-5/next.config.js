module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source:
          '/:firstLevel([0-9]{4})/:secondLevel([0-9]{2})/:thirdLevel([0-9]{2})/:fourthLevel',
        destination:
          '/new-york/:firstLevel/:secondLevel/:thirdLevel/:fourthLevel',
        permanent: true,
      },
      {
        source: '/:firstLevel/tag/:tagName',
        destination: '/tag/:tagName',
        permanent: true,
      },
      {
        source: '/:firstLevel/author/:authorName',
        destination: '/author/:authorName',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:all*.(ttf|woff|woff2)',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
  images: {
    domains: [
      'dev.therealdeal.com',
      'stg.therealdeal.com',
      'preview.therealdeal.com',
    ],
  },
};
