module.exports = {
  devtool: 'source-map',
  entry: './index.js',
  output: {
    path: './build',
    filename: 'cablecar.js',
    library: 'cablecar',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
};
