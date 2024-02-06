const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    port: 2424,
    static: {
      directory: path.join(__dirname, "../../dist"),
    },
    hot: true,
    open: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  stats: "minimal", // 출력되는 로그 메세지는 최소한으로 (차후 'none'으로 변경 고려)
});
