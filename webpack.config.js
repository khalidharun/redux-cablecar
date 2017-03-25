module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'redux-cablecar.js',
    library: 'redux-cablecar',
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
