var express = require('express')
var webpack = require('webpack')
var ejs = require('ejs')
var path = require('path')
var proxyMiddleware = require('http-proxy-middleware')
var wpDevMiddleware = require('webpack-dev-middleware')
var wpHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('../build/webpack.dev.config.js')

var app = express()

// 配置webpack及热加载
var compiler = webpack(webpackConfig)

var devMiddleware = wpDevMiddleware(compiler, {
	noInfo: true,
	publicPath: webpackConfig.output.publicPath
})

var hotMiddleware = wpHotMiddleware(compiler, {
	log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
})

// 服务器代理
app.use(proxyMiddleware('/api', {target: 'http://120.27.45.244:8050', changeOrigin: true}))

app.use(devMiddleware)
app.use(hotMiddleware)

// 设置模板引擎
app.engine('html', ejs.__express)
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, '../dist/templates'))

// 设置静态资源目录
app.use(express.static('../dist'))

// 路由
require('../untils/loadRouter')(app, require('../config/router.js'))

app.listen(8090, function () {
	console.log('Server starts: http://localhost:8090')
})