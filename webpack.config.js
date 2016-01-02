const path = require('path');
const webpack = require('webpack');

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
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};
