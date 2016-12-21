var request = require('request')
var cheerio = require('cheerio')

module.exports = function(cb) {

	var base = 'http://www.nohrsc.noaa.gov/nsa/discussions_text/National/snowfall/'

	var d = new Date()

	var year = d.getUTCFullYear()

	var month = (d.getUTCMonth() + 1).toString().slice(-2)

	var url = base + year + month

	request(url, function(error, response, body) {

		if (!error && response.statusCode == 200) {

			$ = cheerio.load(body)

			var file = $('ul li').children().last().text().trim().replace('_m', '_e')

			cb(null, url + '/' + file)

		} else {

			cb(error + ': ' + url)

		}

	})

}
