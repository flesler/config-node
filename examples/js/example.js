/**
 * Example on how to use regular NodeJS files, the (module)exports is used
 * node example.js -> "We are in development"
 * NODE_ENV=production node example.js -> "We are in production"
 */

var config = require('../../index')();

console.log(config.message);