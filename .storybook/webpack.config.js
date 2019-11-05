const path = require("path");
const custom = require("../webpack.config.js");

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    module: { ...config.module, rules: custom.module.rules },
    resolve: {
      symlinks: false,
      alias: Object.assign({
        AppSrc: path.resolve(__dirname, "../src/"),
        AppAssets: path.resolve(__dirname, "assets/")
      })
    }
  };
};
