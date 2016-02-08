var request = require('request');
var Promise = require('es6-promise').Promise;

module.exports = function () {

	return new Promise(function(resolve, reject) {

		var URL = 'http://www.nohrsc.noaa.gov/nsa/discussions_text/National/snowfall/201602/snowfall_2016020806_e.txt';

		request(URL, function (error, response, body) {
			if (!error && response.statusCode == 200) {

				var data = parseText(body);
				resolve({ 'id': 'national', data });

			} else {
				resolve({
					hasError: true,
					error: response.statusCode + ': Could not load ' + URL
				});
			}
		});
	});
};

var createStationJSON = function(columns, data) {
	var station = columns.reduce(function(previous, current, index) {
		previous[current] = data[index];
		return previous;
	}, {});

	// remove empty field because of final pipe
	delete station[''];
	return station;
};

var isInRegion = function(str) {
	var regions = ['MA', 'ME', 'VT', 'NH', 'RI', 'CT', 'NY', 'NJ', 'PA'];
	var inRegion = regions.filter(function(el) {
		var regionStr = ', '+ el;
		return str.indexOf(regionStr) > -1;
	});

	return inRegion.length;
};

var isInRegion2 = function(lat, lng) {
	var bounds = {lat: [38.7,47.7], lng: [-81.0, -66.5]};
	return lat > bounds.lat[0] && lat < bounds.lat[1] && lng > bounds.lng[0] && lng < bounds.lng[1];
};

var parseText = function(str) {
	// rows[0] should === ! THESE DATA ARE UNOFFICIAL AND PROVISIONAL
	// rows[1] should be column names
	var rows = str.split('\n');
	var data = rows.slice(2, rows.length);
	var columns = rows[1].split('|');

	var withoutPipe = data.map(function(el) { return el.split('|') });
	var withRegion = withoutPipe.filter(function(el) { return el.length > 1 && isInRegion(el[1]) });
	// var withRegion = withoutPipe.filter(function(el) { return el.length > 1 && isInRegion2(el[2], el[3]) });

	var withStation = withRegion.map(function(el) {
		if (columns.length === el.length) {
			return createStationJSON(columns, el);
		}
	});

	return withStation;
};