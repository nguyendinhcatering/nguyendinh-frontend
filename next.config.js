const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new MomentLocalesPlugin({
        localesToKeep: ["vi"],
      })
    );

    return config;
  },
};
