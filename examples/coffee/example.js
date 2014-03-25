/**
 * Example on how to add support for Coffee-Script files
 * - This uses the `coffee-script` module as an example, you can use any
 */

// $> npm install --save coffee-script

var config = require('../../index')({
	coffee: require('coffee-script').eval
});

console.log(config.message);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"