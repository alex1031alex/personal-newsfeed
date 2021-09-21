const path = require('path');

module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
