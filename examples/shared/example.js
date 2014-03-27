/**
 * Example on how to use have part of the configuration shared on all envs
 */

var config = require('../../index');
// Split into multiple lines so it's easier to understand
config({env:'shared'});
config();

console.log(config.shared, config.message);

// $> node example.js -> true "We are in development"
// $> NODE_ENV=production node example.js -> true "We are in production"