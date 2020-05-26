const assume = require('assume');
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const utils = require('../../../src/utils');

describe('Utils Unit Tests', function() {
  const fullDirectory = 'test/test-utilities/full';
  const emptyDirectory = 'test/test-utilities/empty';

  describe('getVersion', function() {
    it('should retrive files', function() {
      const result = utils.getVersions(fullDirectory);
      assume(result).to.eql(['1.js','2.js']);
    });

    it('should not retrive files', function() {
      const result = utils.getVersions(emptyDirectory);
      assume(result).to.eql([]);
    });
  });

  describe('createDir', function() {
    const path = './versions';

    after(function() {
      fs.rmdirSync(path);
    });

    it('should create a directory', function() {
      utils.createDir(path);

      assume(fs.existsSync(path)).to.equal(true);
    });

    it('should not attmpt to create a directory', function() {
      const mkdirSpy = sinon.spy(fs, 'mkdirSync');

      utils.createDir(path);

      assume(mkdirSpy.called).to.equal(false);
    });
  });

  describe('compareCurrentFiles', function() {
    afterEach(function() {
      const files = fs.readdirSync(fullDirectory);
      files.forEach(function(file) {
        if (file !== '1.js' && file !== '2.js') {
          fs.unlinkSync(`${fullDirectory}/${file}`);
        }
      });
    });

    it('should find a match and skip creating a file', function() {
      const count = fs.readdirSync(fullDirectory).length;
      const result = utils.compareCurrentFiles('bar', fullDirectory);
      const updatedCount = fs.readdirSync(fullDirectory).length;

      assume(count).to.equal(updatedCount);
      assume(result).to.equal(true);
    });

    it('should not find a match and create a file', function() {
      const count = fs.readdirSync(fullDirectory).length;
      const result = utils.compareCurrentFiles('foobar', fullDirectory);
      const updatedCount = fs.readdirSync(fullDirectory).length;

      assume(count + 1).to.equal(updatedCount);
      assume(result).to.equal(false);
    });

    it('should use default directory path', function () {
      const path = './versions';
      const result = utils.compareCurrentFiles('bar');
      const count = fs.readdirSync(path).length;

      assume(count).to.equal(1);
      assume(result).to.equal(false);

      const file = fs.readdirSync(path);
      fs.unlinkSync(`${path}/${file[0]}`);
      fs.rmdirSync(path);
    });
  });
});
