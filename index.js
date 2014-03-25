/**
 * @author Ariel Flesler <aflesler@gmail.com>
 * @version 1.0.0
 * Homepage: https://github.com/flesler/config-node
 */
var path = require('path');
var fs = require('fs');

var config = module.exports = function(opts) {
	opts = opts || {};

	var dir = opts.dir || 'config';
	if (dir.indexOf('.') === -1) {
		dir = path.join(process.cwd(), dir);
	}

	var env = opts.env || process.env.NODE_ENV || 'development';
	var ext = extension(dir, env);
	var file = path.join(dir, env) + (ext ? '.'+ext : '');
	// directory(''), js and json are handled by native require	
	var data = ext in opts ? opts[ext](fs.readFileSync(file, 'utf8')) : require(file);

	for (var key in data) {
		config[key] = data[key];
	}

	return config;
};

function extension(dir, env) {
	var re = new RegExp(env+'(\.|$)', 'i');
	var file = fs.readdirSync(dir).filter(function(filename) {
		return re.test(filename);
	})[0];

	if (!file) {
		throw new Error('No file found for environment '+env);
	}

	return path.extname(file).slice(1);
}
