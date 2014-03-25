/**
 * Example on how to keep the development config unversioned
 * - This doesn't only apply to JSON files
 * - You can pick any name for the template
 * - This module doesn't handle the auto generation of the default file
 */

// $> echo template-development.json >> .gitignore
// $> cp config/template-development.json config/development.json

var config = require('../../index')();

console.log(config.message);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"