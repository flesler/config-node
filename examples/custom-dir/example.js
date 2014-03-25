/**
 * Example on how to change the default directory (config)
 * The dir can actually be an absolute path to the filesystem
 */

var config = require('../../index')({dir:'settings'});

console.log(config.message);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"