const path = require("path")

/** @type { import("webpack").Configuration } */
const config = {
  entry: "./functions/index.ts",
  output: {
    filename: "worker.js",
    path: path.join(__dirname, "../dist"),
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
        options: {
          presets: [
            ["@babel/preset-env", { targets: { node: "current" } }],
            "@babel/preset-typescript",
          ],
        },
      },
    ],
  },
}

module.exports = config
