const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: 'bundle.[hash].js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(jpg|svg|png)$/,
      type: 'asset/resource'
    }]
  },
  plugins: [new HTMLWebpackPlugin({
    template: './src/index.html'
  })],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  }
}
