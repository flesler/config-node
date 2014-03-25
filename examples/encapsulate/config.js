var config = module.exports = require('../../index')();

// Silly examples
config.production = config.message.indexOf('production') !== -1;
config.now = new Date();