var path = require('path')
var glob = require('glob')
var HtmlWebpackPlugin = require('html-webpack-plugin')


function getEntry (globPath, serverConfig) {
	var files = glob.sync(globPath)
	var entries = {}
	var paths = {}
	var entry, basename, extname

	for (var i = 0, len = files.length; i < len; i++) {
		entry = files[i]
		extname = path.extname(entry)
		basename = path.basename(entry, extname)
		if (serverConfig) {
			entries[basename] = [entry, serverConfig.entriesAdd]
		} else {
			entries[basename] = entry
		}
		paths[basename] = /js\/(.*)\.js/.exec(entry)[1]
	}
	return pathObj = {
		entries: entries,
		paths: paths
	}
}

function buildHtml (paths) {

	var plugins = []

	// HtmlWebpackPlugin 页面处理
	for (var key in paths) {
	  	plugins.push(
	    	new HtmlWebpackPlugin({
			    filename: `templates/${key}.html`,
			    template: `./src/templates/${paths[key]}.html`,
			    inject: 'body',
			    hash: false,
			    cache: true,
			    chunks: ['vendors', key],
			    minify: {
			       	removeComments: true,
			        collapseWhitespace: true
			    }
	    	})
		)
	}
	return plugins
}

module.exports = {
	getEntry: getEntry,
	buildHtml: buildHtml
}