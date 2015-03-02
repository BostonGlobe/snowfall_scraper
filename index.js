var Promise = require('es6-promise').Promise;
var _ = require('lodash');
require('shelljs/global');

var scrapers = [
	require('./scrapers/timestamp.js')(),
	require('./scrapers/snowfall_points.js')()
];

Promise.all(scrapers)
	.then(function(results) {

		var data = {};

		results.forEach(function(result) {
			data = _.assign(data, result);
		});

		if (data.hasError) {
			exec('echo "' + JSON.stringify(data) + '" | mail -s "error in snowfall_scraper." gabriel.florit@globe.com');
		} else {
			console.log('snowfall_scraper(' + JSON.stringify(data) + ');');
		}

	})
	.catch(function(error) {
		exec('echo "' + JSON.stringify(error) + '" | mail -s "error in snowfall_scraper." gabriel.florit@globe.com');
	});		