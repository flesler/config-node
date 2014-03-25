/**
 * Example on how to pass environment instead of process.env.NODE_ENV
 */

var config = require('../../index')({ env:'production' });

console.log(config.message);

// $> node example.js -> "We are in production"
// $> NODE_ENV=production node example.js -> "We are in production"