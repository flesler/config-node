var config = module.exports = require('../../index');

// Set defaults before loading
config.message = 'Default message that will be overriden';

// Load
config();

// Silly examples
config.production = config.message.indexOf('production') !== -1;
config.now = new Date();