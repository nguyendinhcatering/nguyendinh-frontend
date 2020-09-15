const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

console.log("public api", process.env.NEXT_PUBLIC_BACKEND_URL);

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
