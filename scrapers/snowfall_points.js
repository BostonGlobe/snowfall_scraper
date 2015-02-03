var request = require('request');
var Promise = require('es6-promise').Promise;
var xml2js = require('xml2js');

function extractPropertiesFromPlacemark(placemark) {

	var result = null;
	var snowfallTotalMatch;

	snowfallTotalMatch = placemark.description[0].match(/<b>Storm Total Snowfall: (.*) inches<\/b>/);

	if (snowfallTotalMatch) {

		result = {};

		result.latitude = placemark.LookAt[0].latitude[0];
		result.longitude = placemark.LookAt[0].longitude[0];
		result.snowfall = snowfallTotalMatch[1];
		result.time = placemark.description[0].match(/<b>Time of Report:<\/b> (.*) on (.*)<br>/)[1];
		result.date = placemark.description[0].match(/<b>Time of Report:<\/b> (.*) on (.*)<br>/)[2];
	}

	return result;
}

module.exports = function () {

	return new Promise(function(resolve, reject) {

		var URL = 'http://www.erh.noaa.gov/hydromet/eventdata/stormTotalv3_24/stormTotalv3_24.point.snow.kml';

		request(URL, function (error, response, body) {
			if (!error && response.statusCode == 200) {

				xml2js.parseString(body, function (err, result) {

					if (err) {
						reject(Error(err || 'Could not xml2js parse ' + URL));
					} else {

						var doc = result.kml.Document[0];
						var placemarks = doc.Placemark;

						var points = placemarks
							.map(extractPropertiesFromPlacemark)
							.filter(function(v) {
								return v;
							});

						resolve({
							snowfall_points: points
						});

					}

				});

			} else {
				reject(Error(error || 'Could not load ' + URL));
			}
		});
	});

};