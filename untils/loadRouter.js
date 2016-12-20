module.exports = function (app, routers) {
	for (var key in routers) {
		(function (keyName) {
			app.get(keyName, function(req, res) {
				res.render(routers[keyName])
			})
		})(key)
	}
}