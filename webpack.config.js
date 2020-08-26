'use strict'

const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: "production",
  devtool: 'source-map',
  output: {
    library: 'ReduxCableCar',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      { test: /\.js$/, loaders: ['babel-loader'], include: [ path.resolve(__dirname, 'src') ] },
    ],
  },
};
