/**
 * Example on how to add support for YAML files
 * - This uses the `js-yaml` module as an example, you can use any
 * - Check https://github.com/nodeca/js-yaml for further information
 */

// $> npm install --save js-yaml

var yaml = require('js-yaml').safeLoad; // or .load
var config = require('../../index')({	yml: yaml });

console.log(config.message);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"