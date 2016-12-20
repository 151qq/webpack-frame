process.env.NODE_ENV = 'development'

var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config')
var wpServeCon = require('../config/webpack.server.config.js')
var wpTools = require('../untils/webpack.tools.js')

var pathObj = wpTools.getEntry('./src/js/**/*.js', wpServeCon)

config = merge(baseConfig, {
	entry: pathObj.entries,
	output: {
		publicPath: wpServeCon.publicPath
	},
	devtool: '#source-map',
})

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new webpack.HotModuleReplacementPlugin()
], wpTools.buildHtml(pathObj.paths))

module.exports = config