var Promise = require('es6-promise').Promise;
require('shelljs/global');

var scrapers = [
	// require('./scrapers/snowfall_2016_national.js')(),
	require('./scrapers/snowfall_2016_climate.js')()
];

Promise.all(scrapers)
	.then(function(results) {
		
		var data = {};

		results.map(function(result) {
			data[result.id] = result.data;
		});

		data.updated = new Date().toString();
		console.log('snowfall_scraper(' + JSON.stringify(data) + ');');
	})
	.catch(function(error) {
		exec('echo "' + error + '" | mail -s "error in snowfall_scraper." russell.goldenberg@globe.com');
	});		