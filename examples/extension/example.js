/**
 * Example on how to specify the file extension
 * node example.js -> "We are in development"
 * NODE_ENV=production node example.js -> "We are in production"
 */

// NOTE: Specifying ext is only to improve performance
// You can pass {ext:''} to indicate directory

var config = require('../../index')({ext:'json'});

console.log(config.message);