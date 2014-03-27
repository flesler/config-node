/**
 * Example on how to add support for XML files
 * - This uses the `xml2json` module as an example, you can use any
 * - Check https://github.com/buglabs/node-xml2json for further information
 */

// $> npm install --save xml2json

function xml(data) {
	return require('xml2json').toJson(data, {object:true});
}
var config = require('../../index')({	xml: xml });

console.log(config.messages.location);

// $> node example.js -> "We are in development"
// $> NODE_ENV=production node example.js -> "We are in production"

