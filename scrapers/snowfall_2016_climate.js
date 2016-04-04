var request = require('request');
var Promise = require('es6-promise').Promise;
var cheerio = require('cheerio');

module.exports = function () {

	return new Promise(function(resolve, reject) {

		var url = 'http://www.nws.noaa.gov/view/prodsByState.php?state=MA&prodtype=public';

		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {

				var text = getText(body);
				var data = parseText(text);
				resolve({'id': 'climate', 'data': data });

			} else {
				reject(error + ': ' + url);
			}
		});
	});
};

var getText = function(body) {
	$ = cheerio.load(body);
	var lines = [];
	$('pre').each(function() {
		lines.push( $(this).text() );
	});

	return lines.join('\n');
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

var getObj = function(str) {
	var split = str.split(',');
	var columns = ['Date', 'Time', 'State', 'County', 'City', null, null, 'Latitude', 'Longitude',  'Type', 'Amount', 'Unit', 'Source', null];
	var obj = columns.reduce(function(previous, current, index) {
		if (current) {
			previous[current] = split[index].trim();	
		}
		return previous;
	}, {});

	return obj;
};

var parseText = function(text) {
	var lines = text.split('\n');

	var trigger = '*****METADATA*****';
	var collect = false;
	var done = false;

	var data = lines.map(function(line, i) {
		var trimmed = line.trim();
		
		if (done) { 
			return null;
		}
		
		// start collecting on metadata trigger
		if (!done && !collect && trimmed.indexOf(trigger) > -1) {
			collect = true;
			return null;
		} 

		// stop collecting on empty trimmed
		if (collect && trimmed.length === 0) {
			collect = false;
			done = true;
			return null;
		}

		if (collect) {
			return getObj(trimmed);
		}

		return null;
	});

	return data.filter(function(el) { 
		return el && el.Type === 'SNOW';
	});
};