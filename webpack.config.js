const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, 'src');

const templateContent = `<!DOCTYPE html><html><head><title></title></head><body><div id="root"></div></body></html>`

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
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
      },
      {
        test: /.css$/,
        loader: 'style!css!'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};
