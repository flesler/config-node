var expect = require('chai').expect,
	fs = require('fs');

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
		it('should be a function', function() {
			expect(config).to.be.a('function');
			expect(config.length).to.equal(1);
		});

		it('should return itself', function() {
			expect(config()).to.equal(config);
		});
	});

	describe('env', function() {
		it('should default to development when no NODE_ENV', function() {
			config();
			expect(config.env).to.equal('development');
		});

		it('should default to NODE_ENV if present', function() {
			process.env.NODE_ENV = 'production';
			config();
			expect(config.env).to.equal('production');
		});

		it('should give "env" the highest priority', function() {
			process.env.NODE_ENV = 'production';
			config({env:'env'});
			expect(config.env).to.equal('env');
		});

		it('should override properties when loading a second file', function() {
			config()({env:'production'});
			expect(config.env).to.equal('production');
		});

		it('should merge objects when loading a second file', function() {
			config({env:'deep'})({env:'deep2'});
			
			expect(config.top.number).to.equal(5);
			expect(config.deep.prop).to.equal('val2');
			expect(config.deep.other).to.equal('val');
			expect(config.deep.new).to.equal('val');
			expect(config.dontMergeArray).to.deep.equal([4, 5]);
		});
	});

	describe('dir', function() {
		it('should load from config/ by default', function() {
			config();
			expect(config.dir).to.equal('config');
		});

		it('should load from another directory if "dir" is given', function() {
			config({dir:'settings'});
			expect(config.dir).to.equal('settings');
		});

		// TODO: Test absolute dirs, also ones with "."
	});

	describe('ext', function() {
		it('should guess the ext when non is given', function() {
			config();
			expect(config.ext).to.equal('json');

			config({env:'script'});
			expect(config.ext).to.equal('js');
		});

		it('should respect ext when given', function() {
			config({env:'ambiguous', ext:'js'});
			expect(config.ext).to.equal('js');
			
			config({env:'ambiguous', ext:'json'});
			expect(config.ext).to.equal('json');
		});

		it('should load index.js when a folder is found', function() {
			config({env:'folder'});
			expect(config.number).to.equal(6);
			expect(config.db).to.have.property('port', 1337);
		});

		it('should work as usual when the env has dots', function() {
			config({env:'file.in'});
			expect(config.env).to.equal('file.in');
			expect(config.ext).to.equal('json');
		});

		it('should not load files that begin with env followed by a character other than "."', function() {
			expect(function () {
				config({env: 'should-not-be'});
			}).to.throw('No file found for environment should-not-be');
		});

		it('should load files that begin with env followed by a "."', function() {
			function parser(data) {
				var obj = JSON.parse(data);
				obj.called = true;
				return obj;
			}
			config({env:'should-be', 'loaded.json': parser});
			expect(config.env).to.equal('should-be');
			expect(config.ext).to.equal('loaded.json');
			expect(config.called).to.be.true;
		});

		it('should work as usual when the ext has dots', function() {
			function parser(data) {
				var obj = JSON.parse(data);
				obj.called = true;
				return obj;
			}
			config({env:'file', 'in.json': parser});
			expect(config.env).to.equal('file.in');
			expect(config.ext).to.equal('json');
			expect(config.called).to.be.true;
		});
	});

	describe('parsers', function() {
		it('should give priority to given parsers', function() {
			function parser(_) { return {worked:true}; }

			config({json: parser});
			expect(config.worked).to.be.true;
		});

		it('should work for non standard extensions', function() {
			function parser(_) { return {worked:true}; }
			config({env:'very', ext:'odd', odd: parser});
			expect(config.worked).to.be.true;
		});

		it('should pass file contents to parser', function() {
			function checker(data) {
				var file = fs.readFileSync('config/development.json', 'utf8');
				expect(data).to.equal(file);
				return {called:true}; 
			}

			config({json: checker});
			expect(config.called).to.be.true;
		});

		it('should support returned array', function() {
			function array(_) { return ['a', 'b']; }

			config({json: array});
			expect(config[0]).to.equal('a');
			expect(config[1]).to.equal('b');
		});
	});

	describe('errors', function() {
		it('should throw a controlled error when the file is not found and ext is not given', function() {
			expect(function() { 
				config({env:'404'}); 
			}).to.throw('No file found for environment 404');
		});

		it('should throw a require error when the file is not found, ext is given but no parser', function() {
			expect(function() { 
				config({env:'404', ext:'not'}); 
			}).to.throw('Cannot find module');
		});

		it('should throw an ENOENT when the file is not found, ext and parser are given', function() {
			expect(function() { 
				config({env:'404', ext:'not', not:function(_){} }); 
			}).to.throw('ENOENT');
		});

		it('should throw a require error when a folder is required and no index.js is found', function() {
			expect(function() { 
				config({env:'empty'}); 
			}).to.throw('Cannot find module');
		});

		it('should throw a SyntaxError when parsing fails', function() {
			expect(function() { 
				config({env:'invalid'}); 
			}).to.throw(SyntaxError);
		});

		it('should let an error rise when thrown by a custom parser', function() {
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