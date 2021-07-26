const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
});
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  
};

module.exports = withPlugins([
  withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  }),
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  }),
], nextConfig);
