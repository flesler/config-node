/**
 * Example on how to use JSON files
 */

var config = require('../../index')();

console.log(config.message);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"