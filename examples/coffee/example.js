/**
 * Example on how to add support for Coffee-Script files
 * npm install --save coffee-script
 * node example.js -> "We are in development"
 * NODE_ENV=production node example.js -> "We are in production"
 */

var config = require('../../index')({
	coffee: require('coffee-script').eval
});

console.log(config.message);