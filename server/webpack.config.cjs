const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = {
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: "node",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^optional_dependency$/,
      contextRegExp: /mongodb\/lib/, // Ignore optional dependencies in mongodb
    }),
  ],
  optimization: {
    minimize: false, // Disable Terser minification
  },
  devtool: "source-map",
};
