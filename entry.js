import getReports from './scrapers/getReports.js'
import shell from 'shelljs'
import fs from 'fs-extra'

getReports()
	.then(results => {

		fs.writeJsonSync('./snowfall_scraper.json', results)

	})
	.catch(error => {

		shell.exec('echo "' + error + '" | mail -s "error in snowfall_scraper." gabriel.florit@globe.com')

	})