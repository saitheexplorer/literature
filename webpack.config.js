const path = require('path');

const src = path.join(__dirname, 'src');

module.exports = {
  entry: src,

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },

  resolve: {
    root: src
  },

  devtool: 'cheap-source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
