/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const nextTranslatePlugin = require("next-translate-plugin");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
   basePath: 'http://asop.synology.me:8082/api/', 
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
    });
    return config;
  },
};

// eslint-disable-next-line no-undef
module.exports = nextTranslatePlugin(nextConfig);
