/**
 * Example on how to add support for YAML files
 */

// $> npm install --save js-yaml

var yaml = require('js-yaml').safeLoad; // or .load
var config = require('../../index')({	yml: yaml });

console.log(config.message);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"