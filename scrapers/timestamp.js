var request = require('request');
var Promise = require('es6-promise').Promise;

module.exports = function () {

	return new Promise(function(resolve, reject) {

		var URL = 'http://www.erh.noaa.gov/hydromet/eventdata/stormTotalv3_24/latestInfo.js';

		request(URL, function (error, response, body) {
			if (!error && response.statusCode == 200) {

				var match = body.match(/(titlePns\['snow'\]='Storm Total &amp; 24 Hour Snowfall Reports \(in\) <br>Received During Previous 24 Hours Ending )([a-z]+) (\d+), (\d+) at (\d+):(\d+) ([a-z]+)';/i);

				if (match) {

					resolve({
						timestamp: {
							month: match[2],
							day: +match[3],
							year: +match[4],
							hour: +match[5],
							minutes: +match[6],
							mode: match[7]
						}
					});

				} else {
					resolve({
						hasError: true,
						error: 'Could not regex match 24 hour snowfall reports datetime.'
					});
				}

			} else {
				resolve({
					hasError: true,
					error: response.statusCode + ': Could not load ' + URL
				});
			}
		});
	});

};