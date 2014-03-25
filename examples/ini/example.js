/**
 * Example on how to add support for INI files
 */

// $> npm install --save ini

var ini = require('ini').parse;
var config = require('../../index')({	ini: ini });

console.log(config.messages.location);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"