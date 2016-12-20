var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./webpack.base.config')
var wpTools = require('../untils/webpack.tools.js')

process.env.NODE_ENV = 'production'

var pathObj = wpTools.getEntry('./src/js/**/*.js')

console.log(pathObj)

config = merge(config, {
  entry: pathObj.entries,
  output: {
    publicPath: '../'
  }
})

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
], wpTools.buildHtml(pathObj.paths))

module.exports = config
