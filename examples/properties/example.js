/**
 * Example on how to add support for INI files
 * - This uses the `properties` module as an example, you can use any
 * - Check https://github.com/gagle/node-properties for further information
 */

// $> npm install --save properties

var properties = require('properties').parse;
var config = require('../../index')({	properties: properties });

console.log(config.message);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"