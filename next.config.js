/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'via.placeholder.com', 'flowbite.s3.amazonaws.com'],
  },
  pageExtensions: ['tsx', 'ts'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          // test: /\.ts$/,
          // use: {
          //   loader: 'babel-loader',
          //   options: {
          //     presets: ['@babel/preset-env', '@babel/preset-typescript'],
          //   },
          // },
        },
      ]
    );
    return config;
  },
};

module.exports = withContentlayer(nextConfig);
