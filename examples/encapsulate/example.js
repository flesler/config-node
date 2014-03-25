/**
 * Example on how to encapsulate the configuration login into a dedicated file
 */

var config = require('./config');

console.log(config.message);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"

// The lesson is: you are not forced to have all the config loading
// logic on the main file