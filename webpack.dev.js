var config = require('./build/config')
var path = require('path')
var webpack = require('webpack')
var WebpackNotifier = require('webpack-notifier')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: config.BUILD_TARGET_PATH,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
      }
    ],
  },
  plugins: [
    new WebpackNotifier({
      alwaysNotify: true,
      title: 'i18n-utils'
    })
  ],
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src/js'), 'node_modules']
  },
}
