/*jshint -W030 */
var expect = require('chai').expect,
	fs = require('fs'),
	config;

function should(msg, fn) {
	it('should '+msg, fn);
}

describe('config-node', function() {
	before(function() {
		process.chdir('test');
	});

	beforeEach(function() {
		// No module caching
		require.cache = {};
		// A new instance for every test
		config = require('../index');
		
		delete process.env.NODE_ENV;
	});

	describe('basic', function() {
		should('be a function', function() {
			expect(config).to.be.a('function');
			expect(config.length).to.equal(1);
		});

		should('return itself', function() {
			expect(config()).to.equal(config);
		});
	});

	describe('env', function() {
		should('default to development when no NODE_ENV', function() {
			config();
			expect(config.env).to.equal('development');
		});

		should('default to NODE_ENV if present', function() {
			process.env.NODE_ENV = 'production';
			config();
			expect(config.env).to.equal('production');
		});

		should('give "env" the highest priority', function() {
			process.env.NODE_ENV = 'production';
			config({env:'env'});
			expect(config.env).to.equal('env');
		});

		should('override properties when loading a second file', function() {
			config()({env:'production'});
			expect(config.env).to.equal('production');
		});

		should('merge objects when loading a second file', function() {
			config({env:'deep'})({env:'deep2'});
			
			expect(config.top.number).to.equal(5);
			expect(config.deep.prop).to.equal('val2');
			expect(config.deep.other).to.equal('val');
			expect(config.deep.new).to.equal('val');
			expect(config.dontMergeArray).to.deep.equal([4, 5]);
		});
	});

	describe('dir', function() {
		should('load from config/ by default', function() {
			config();
			expect(config.dir).to.equal('config');
		});

		should('load from another directory if "dir" is given', function() {
			config({dir:'settings'});
			expect(config.dir).to.equal('settings');
		});

		should('support relative paths', function() {
			config({dir:'./config'});
			expect(config.dir).to.equal('config');
			
			config({dir:'../test/settings'});
			expect(config.dir).to.equal('settings');
		});

		should('support absolute paths', function() {
			// FIXME: Won't work on Windows (path.resolve() doesn't fix C:/)
			config({dir:__dirname+'/config'});
			expect(config.dir).to.equal('config');
		});

		// TODO: Test absolute dirs, also ones with "."
	});

	describe('ext', function() {
		should('guess the ext when non is given', function() {
			config();
			expect(config.ext).to.equal('json');

			config({env:'script'});
			expect(config.ext).to.equal('js');
		});

		should('respect ext when given', function() {
			config({env:'ambiguous', ext:'js'});
			expect(config.ext).to.equal('js');
			
			config({env:'ambiguous', ext:'json'});
			expect(config.ext).to.equal('json');
		});

		should('load index.js when a folder is found', function() {
			config({env:'folder'});
			expect(config.number).to.equal(6);
			expect(config.db).to.have.property('port', 1337);
		});

		should('work as usual when the env has dots', function() {
			config({env:'file.in'});
			expect(config.env).to.equal('file.in');
			expect(config.ext).to.equal('json');
		});

		should('not load files whose filename only starts with env', function() {
			expect(function() {
				// Should not match development.json
				config({env: 'dev'});
			}).to.throw('No file found for environment dev');
		});
			
		should('not load files whose filename only starts with env followed by a dot', function() {
			expect(function() {
				// Should not match file.in.json
				config({env: 'file'});
			}).to.throw('No file found for environment file');
		});
	});

	describe('parsers', function() {
		should('give priority to given parsers', function() {
			function parser(_) { return {worked:true}; }

			config({json: parser});
			expect(config.worked).to.be.true;
		});

		should('work for non standard extensions', function() {
			function parser(_) { return {worked:true}; }
			config({env:'very', ext:'odd', odd: parser});
			expect(config.worked).to.be.true;
		});

		should('pass file contents to parser', function() {
			function checker(data) {
				var file = fs.readFileSync('config/development.json', 'utf8');
				expect(data).to.equal(file);
				return {called:true}; 
			}

			config({json: checker});
			expect(config.called).to.be.true;
		});

		should('support returned array', function() {
			function array(_) { return ['a', 'b']; }

			config({json: array});
			expect(config[0]).to.equal('a');
			expect(config[1]).to.equal('b');
		});
	});

	describe('errors', function() {
		should('throw a controlled error when the file is not found and ext is not given', function() {
			expect(function() { 
				config({env:'404'}); 
			}).to.throw('No file found for environment 404');
		});

		should('throw a require error when the file is not found, ext is given but no parser', function() {
			expect(function() { 
				config({env:'404', ext:'not'}); 
			}).to.throw('Cannot find module');
		});

		should('throw an ENOENT when the file is not found, ext and parser are given', function() {
			expect(function() { 
				config({env:'404', ext:'not', not:function(_){} }); 
			}).to.throw('ENOENT');
		});

		should('throw a require error when a folder is required and no index.js is found', function() {
			expect(function() { 
				config({env:'empty'}); 
			}).to.throw('Cannot find module');
		});

		should('throw a SyntaxError when parsing fails', function() {
			expect(function() { 
				config({env:'invalid'}); 
			}).to.throw(SyntaxError);
		});

		should('let an error rise when thrown by a custom parser', function() {
			var err = new Error(':)');
			expect(function() { 
				config({json:function(){
					throw err;
				}}); 
			}).to.throw(err);
		});
	});

	afterEach(function() {
	});
	
	after(function() {
		process.chdir('..');
	});
 });