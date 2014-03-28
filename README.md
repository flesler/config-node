# Flexible lightweight configuration loader

## Installation

``` bash
$ npm install config-node
```

## Basic usage

```js
var config = require('config-node')();
console.log(config.server.port);
```

`config` will contain the contents of the configuration file named `process.env.NODE_ENV` or `'development'`, on the folder `config/`.<br />
It can be a JSON, a JS that fills `module.exports` or a directory with an index.js inside.

You probably noticed there's a function call in there. It needs to be added once to load the data. This is where you can put your options.
You'll probably do that on your main js file, in all the other ones you only require it:

```js
// in db.js
var config = require('config-node');
console.log(config.db.port);
```

## Options

These are the defaults:

```js
var config = require('config-node')({
	dir: 'config', // where to look for files 
	ext: null, // spoil the fun, tell me which one it is ('' for directory). Improves performance.
	env: process.env.NODE_ENV || 'development' // set which one instead of smart defaults
});
```

In order to support more formats beyond json, js and directories. You add a file with a different extension to the config folder
and pass an option named as the extension with a function that takes the file string data and returns an object, synchronously!

```js
var config = require('config-node')({
	png: function(data) { return convertPNGtoObjectSomehow(data); }
});
```

Check the examples to see more use cases.

## Examples

- [How to use JSON files](examples/json)
- [How to use JS files](examples/js)
- [How to use entire folders](examples/folder)
- [How to use YAML files](examples/yaml)
- [How to use Coffee-Script files](examples/coffee)
- [How to use INI files](examples/ini)
- [How to use Properties files](examples/properties)
- [How to use XML files](examples/xml)
- [How to have shared configuration files](examples/shared)
- [How to load from a different directory](examples/custom-dir)
- [How to keep local configuration unversioned](examples/unversioned)
- [How to override the environment from NODE_ENV](examples/environment)
- [How to skip extension detection](examples/extension)
- [How to encapsulate config logic / have defaults](examples/encapsulate)

## Similar Projects

- [flatiron/nconf](https://github.com/flatiron/nconf) - If you need all that, this one is the best. It has it all
- [lorenwest/node-config](https://github.com/lorenwest/node-config) - Good, too complex for me. I'd never need things like file watching(use nodemon)
- [dominictarr/config-chain](https://github.com/dominictarr/config-chain) - Very cool one, too complex for most simple cases
- [dominictarr/rc](https://github.com/dominictarr/rc) - It's great, more oriented to loading files from outside the project
- [pgte/konphyg](https://github.com/pgte/konphyg) - Also great, but only JSON and does failed filesystem reads in most cases
- [scottmotte/dotenv](https://github.com/scottmotte/dotenv) - Loads environment variables from .env file directly into `process.env`
- Feel free to suggest others, these are the ones I found and used for inspiration

## Why use this project over others

- It's simple, the code is short and clean
- It's extensible, it can support coffee, yaml, ini or anything else you want, just DIY.
- It has no dependencies. If you need yaml, just include the one you prefer and pass it over.
- It's fast. Loading configuration needs to be fast, with the `ext` option this module is mostly a smart require.

## Some concepts taken into account

- [Convention over configuration](http://en.wikipedia.org/wiki/Convention_over_configuration), tuned for the mayority.
- [Pareto principle](http://en.wikipedia.org/wiki/Pareto_principle). I aim for that 80% that needs only the 20% of the features.
- [KISS principle](http://en.wikipedia.org/wiki/KISS_principle). It's really simple but it does the job.
- [YAGNI](http://en.wikipedia.org/wiki/YAGNI). I prefer to add features based on requests.

## Tests

To run the test suite:

``` bash
$ npm test
```

## LICENSE

The MIT License (MIT)

Copyright (c) 2014 Ariel Flesler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
