import cheerio from 'cheerio'
import request from 'request-promise-native'

const base = 'http://www.nohrsc.noaa.gov/nsa/discussions_text/National/snowfall/'

const getReportsUrl = () => {

	// Create the url based on today's month
	const date = new Date()
	const year = date.getUTCFullYear()
	const month = (date.getUTCMonth() + 1).toString().slice(-2)
	const url = base + year + month

	// Request url
	return request(url)
		.then(html => {

			// Parse html
			const $ = cheerio.load(html)

			// Get the last entry
			const file = $('ul li')
				.children()
				.last()
				.text()
				.trim()
				.replace('_m', '_e')

			// Return the last entry
			return `${url}/${file}`

		})
		.catch(error => {

			console.error(error)
			process.exit(1)

		})

}

export default getReportsUrl
