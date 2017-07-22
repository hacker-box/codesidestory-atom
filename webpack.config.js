const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./lib/codesidestory-atom.js",
  target: "atom",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "commonjs2"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({ "global.GENTLY": false })],
  externals: [
    {
      atom: "atom",
      remote: "remote"
    }
  ]
};
