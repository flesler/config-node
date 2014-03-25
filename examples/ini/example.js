/**
 * Example on how to add support for INI files
 * - This uses the `ini` module as an example, you can use any
 * - Check https://github.com/isaacs/ini for further information
 */

// $> npm install --save ini

var ini = require('ini').parse;
var config = require('../../index')({	ini: ini });

console.log(config.messages.location);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"