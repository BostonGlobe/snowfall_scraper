// var request = require('request')
// var Promise = require('es6-promise').Promise
// var dsvFormat = require('d3-dsv').dsvFormat
// var EOL = require('os').EOL
// var _ = require('lodash')

// var getReportsUrl = require('./getReportsUrl.js')

const getReports = () => {

	return new Promise(function(resolve, reject) {

		resolve('yes')

// 		getReportsUrl(function(err, url) {

// 			if (err) {

// 				reject(err)

// 			} else if (url) {

// 				request(url, function(error, response, body) {

// 					if (!error && response.statusCode == 200) {

// 						// Skip the first row
// 						var data = body.split(EOL).slice(1).join(EOL)

// 						// Parse pipe-delimited rows
// 						var rows = dsvFormat('|').parse(data)

// 						var result = _(rows)
// 							// filter to 24 hours or less
// 							.filter(function(d) {
// 								return +d.Duration <= 24
// 							})
// 							// group by station id
// 							.groupBy('Station_Id')
// 							.map(function(values, key) {

// 								// var entries = _(values)
// 								// 	.map(function(value) {
// 								// 		return
// 								// 	})
// 								// 	.value()

// 								return {
// 									stationId: key,
// 									entries: entries,
// 								}
// 							})
// 							// .map(function(d) {
// 							// 	return {
// 							// 		amount: +d.Amount,
// 							// 		lat: d.Latitude,
// 							// 		lon: d.Longitude,
// 							// 	}
// 							// })
// 							.sortBy(function(v) {
// 								return -v.entries.length
// 							})
// 							.value()

// 						console.log(JSON.stringify(result, null, 2))

// 						resolve(data)


// 						// var data = parseText(body)
// 						// resolve({ 'id': 'climate', 'data': data })

// 					} else {

// 						reject(error + ': ' + url)

// 					}
// 				})
// 			}
// 		})
	})
}

export default getReports
