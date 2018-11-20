'use strict'

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  output: {
    library: 'ReduxCableCar',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], include: [path.resolve(__dirname, 'src')] },
    ],
  },
};
