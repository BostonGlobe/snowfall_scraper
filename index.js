import getReports from './scrapers/getReports.js'
import shell from 'shelljs'

const scrapers = [
	getReports(),
]

Promise.all(scrapers)
	.then(results => {

		console.log(JSON.stringify(results, null, 2))

	})
	.catch(error => {

		shell.exec('echo "' + error + '" | mail -s "error in snowfall_scraper." gabriel.florit@globe.com')

	})
