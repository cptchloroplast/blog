const path = require("path")

/** @type { import("webpack").Configuration } */
const config = {
  entry: "./functions/index.ts",
  output: {
    filename: "worker.js",
    path: path.join(__dirname, "dist"),
  },
  mode: "production",
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
      },
    ],
  },
}

module.exports = config
