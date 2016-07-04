const webpack = require('webpack')

module.exports = {
  entry: {
    'd3-punchcard': './index.js',
    'd3-punchcard.min': './index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'punchcard',
    libraryTarget: 'umd'
  },
  externals: {
    d3: 'd3'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  watch: true
}
