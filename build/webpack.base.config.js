var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 组件扩展
var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    minChunks: 3
  }),
  new ExtractTextPlugin('css/[name].css', {
    allChunks: true,
    disable: false
  })
]

module.exports = {
	output: {
		path: path.resolve('./dist'),
		filename: 'js/[name].min.js'
	},
	resolve: {
	    extensions: ['', '.js']
	},
	module: {
		preLoaders: [
			{
		      test: /\.js$/,
		      exclude: /node_modules/,
		      loader: 'eslint'
    		}
		],
		loaders: [
			{
		      test: /\.js$/,
		      exclude: /node_modules/,
		      loader: 'babel',
		      query: {
		        presets: ['es2015']
		      }
    		},
    		{
    			test: /\.css$/,
    			loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:["last 2 version", "> 1%"]}')
    		},
    		{
    			test: /\.scss$/,
    			loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:["last 2 version", "> 1%"]}!sass')
    		},
    		{
		      test: /\.(jpe?g|png|gif|svg)$/i,
		      loader: 'url?limit=10000!img?progressive=true'
		    }
		]
	},
	eslint: {
	    formatter: require('eslint-friendly-formatter')
	},
	plugins: plugins
}