/**
 * Example on how to keep the development config unversioned
 * Doesn't need to be a JSON and you can name the template whatever you want
 * Note this example doesn't handle the auto generation of the default file
 *
 * cp config/development.json.template config/development.json
 * node example.js -> "We are in development"
 * NODE_ENV=production node example.js -> "We are in production"
 */

var config = require('../../index')();

console.log(config.message);