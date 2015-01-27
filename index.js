var fs = require('fs-extra');
var xml2js = require('xml2js');

var file = fs.readFileSync('stormTotalv3_72.point.snow.kml', {encoding: 'utf8'});

function log(s) {
	console.log(JSON.stringify(s, null, 4));
}

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

xml2js.parseString(file, function (err, result) {

	var doc = result.kml.Document[0];
	var placemarks = doc.Placemark;

	var points;

	try {

		points = placemarks
			.map(extractPropertiesFromPlacemark)
			.filter(function(v) {
				return v;
			});
			
		log(points);

	} catch(e) {

		log(e);
	}

});










