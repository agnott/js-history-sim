const webpack = require("webpack");

const PATHS = {
  INPUT: {
    JS: `${__dirname}/src/js`,
    CSS: `${__dirname}/src/css`
  },
  OUTPUT: `${__dirname}/dist`
};

module.exports = {
  entry: [
    `${PATHS.INPUT.JS}/index.js`,
    `${PATHS.INPUT.CSS}/index.less`
  ],
  output: {
    path: PATHS.OUTPUT,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: PATHS.INPUT.JS,
        loader: "babel-loader",
        query: {
          presets: ["env"],
          plugins: ["transform-object-rest-spread"]
        }
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
  }
};
