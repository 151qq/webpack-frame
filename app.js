var express = require('express')
require('shelljs/global')
var webpack = require('webpack')
var ejs = require('ejs')
var path = require('path')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./build/webpack.pro.config.js')

var app = express()

// 编译webpack
rm('-rf', webpackConfig.output.path)

var compiler = webpack(webpackConfig)

compiler.run(function () {
	console.log('build success')
})

// 服务器代理
app.use(proxyMiddleware('/api', {target: 'http://120.27.45.244:8050', changeOrigin: true}))

// 设置模板引擎
app.engine('html', ejs.__express)
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, './dist/templates'))

// 设置静态资源目录
app.use(express.static('./dist'))

// 路由
require('./untils/loadRouter')(app, require('./config/router.js'))


app.listen(8090, function () {
	console.log('Server starts: http://localhost:8090')
	console.log('isBuilding...')
})