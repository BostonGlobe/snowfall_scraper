import getReports from './scrapers/getReports.js'
import shell from 'shelljs'

getReports()
	.then(reports => {

		console.log(JSON.stringify(reports, null, 2))

	})
	.catch(error => {

		console.error(error)

		shell.exec('echo "' + error + '" | mail -s "error in snowfall_scraper." gabriel.florit@globe.com')

	})
