var path = require('path'),
	fs = require('fs');

var config = module.exports = function(opts) {
	opts = opts || {};

	var dir = opts.dir || 'config';
	if (dir.indexOf('.') === -1) {
		dir = path.join(process.cwd(), dir);
	}

	var env = opts.env || process.env.NODE_ENV || 'development';
	// You can specify the extension on opts.ext to improve performance
	var ext = 'ext' in opts ? opts.ext : extension(dir, env);
	var file = path.join(dir, env) + (ext ? '.'+ext : '');
	// You can pass an option named as the extension with a function that parses the file
	// else handled by native require() (directory(''), js, json and others) 
	var data = ext in opts ? opts[ext](fs.readFileSync(file, 'utf8')) : require(file);

	for (var key in data) {
		config[key] = data[key];
	}

	return config;
};

function extension(dir, env) {
	var file = fs.readdirSync(dir).filter(function(filename) {
		return filename.indexOf(env) === 0;
	})[0];

	if (!file) {
		throw new Error('No file found for environment '+env);
	}

	return file.slice(env.length+1);
}
