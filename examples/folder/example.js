/**
 * Example on how to load an entire folder with an index.js entry point
 * node example.js -> "We are in development"
 * NODE_ENV=production node example.js -> "We are in production"
 */

var config = require('../../index')();

console.log(config.messages.location);