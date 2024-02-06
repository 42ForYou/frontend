const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const DotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new DotenvWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/favicon.ico", to: "" }, // src 디렉토리에서 루트 출력 디렉토리로 favicon.ico 복사
        { from: "public/images", to: "images" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", // 3. Inject styles into DOM
          "css-loader", // 2. Turns css into commonjs
          "sass-loader", // 1. Turns sass into css
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    filename: "[name].bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
