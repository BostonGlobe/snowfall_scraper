import getReports from './scrapers/getReports.js'

require('shelljs/global')

const scrapers = [
	getReports(),
]

Promise.all(scrapers)
	.then(results => {

		// var data = {}

		// results.map(function(result) {
		// 	data[result.id] = result.data
		// })

		// data.updated = new Date().toString()
		// // console.log('snowfall_scraper(' + JSON.stringify(data) + ')')
		// console.log(JSON.stringify(data), null, 2)

		console.log(results)

	})
	.catch(error => {

		console.error(error)

		// exec('echo "' + error + '" | mail -s "error in snowfall_scraper." gabriel.florit@globe.com')

	})
