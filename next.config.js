/* eslint-disable no-param-reassign */

const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withOffline = require('next-offline');
const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withOptimizedImages = require('next-optimized-images');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');

require('dotenv').config();

const nextConfig = withPlugins(
  [
    withCSS,
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 2,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
    ],
    withFonts,
    withImages,
    [
      withOffline,
      {
        workboxOpts: {
          swDest: process.env.NEXT_EXPORT
            ? 'service-worker.js'
            : 'static/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'offlineCache',
                expiration: {
                  maxEntries: 200,
                },
              },
            },
          ],
        },
        experimental: {
          async rewrites() {
            return [
              {
                source: '/service-worker.js',
                destination: '/_next/static/service-worker.js',
              },
            ];
          },
        },
      },
    ],
    withBundleAnalyzer,
    withOptimizedImages,
  ],
  {
    webpack: (config, { dev }) => {
      config.resolve.alias['~'] = path.join(__dirname, '/');
      config.resolve.alias.components = path.join(__dirname, 'src/components');
      config.resolve.alias.containers = path.join(__dirname, 'src/containers');
      config.resolve.alias.layouts = path.join(__dirname, 'src/layouts');
      config.resolve.alias.styles = path.join(__dirname, 'src/styles');
      config.resolve.alias.utils = path.join(__dirname, 'src/utils');
      config.resolve.alias.hooks = path.join(__dirname, 'src/hooks');
      config.resolve.alias.constants = path.join(__dirname, 'src/constants');
      config.resolve.alias.store = path.join(__dirname, 'src/store');
      config.resolve.alias.libraries = path.join(__dirname, 'src/libraries');

      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        }),
      );

      config.module.rules.push({
        enforce: 'pre',
        test: /\.scss$/,
        loader: 'sass-resources-loader',
        options: {
          resources: ['./src/styles/vars.scss', './src/styles/mixins.scss'],
        },
      });

      if (!dev) {
        config.plugins.push(new OptimizeCSSAssetsPlugin({}));
      }

      return config;
    },
  },
);

module.exports = nextConfig;
