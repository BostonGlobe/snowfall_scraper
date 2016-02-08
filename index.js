var Promise = require('es6-promise').Promise;
require('shelljs/global');

var scrapers = [
	require('./scrapers/snowfall_2016_national.js')(),
	require('./scrapers/snowfall_2016_climate.js')()
];

Promise.all(scrapers)
	.then(function(results) {
		
		var data = {};

		results.map(function(result) {
			data[result.id] = result.data;
			if (result.hasError) { data.hasError = result.error; }
		});

		if (data.hasError) {
			exec('echo "' + JSON.stringify(data) + '" | mail -s "error in snowfall_scraper." russell.goldenberg@globe.com');
		} else {
			data.updated = new Date().toString();
			console.log('snowfall_scraper(' + JSON.stringify(data) + ');');
		}
	})
	.catch(function(error) {
		console.log('gee');
		exec('echo "' + JSON.stringify(error) + '" | mail -s "error in snowfall_scraper." russell.goldenberg@globe.com');
	});		