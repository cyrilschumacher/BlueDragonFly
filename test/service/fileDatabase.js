'use strict';

/* Dependencies */
var assert = require('chai').assert;
var fs = require("fs");
var nock = require('nock');
var path = require("path");
var request = require('supertest');
var FileDatabaseService = require('../../dist/service/fileDatabase');

describe('FileDatabaseService', function() {
    // Global variables.
    var fileDatabase = new FileDatabaseService.default('test/resources/database/', fs, path);

    it('should return a error', function(done) {
        fileDatabase.getRows('notfound', function(error, files) {
            assert.isNotNull(error);
            assert.isUndefined(files);

            done();
        });
    });

    it('should return files', function(done) {
        fileDatabase.getRows('table', function(error, files) {
            assert.isNull(error);
            assert.isNotNull(files);
            assert.equal(files.length, 2);

            done();
        });
    });

    it('should return a error instead files', function(done) {
        fileDatabase.getRows('notFound', function(error, files) {
            assert.isNotNull(error);
            assert.isUndefined(files);

            done();
        });
    });

    it('should return a file with specific content', function(done) {
        fileDatabase.getRow('table', 'first.json', function(error, file) {
            assert.isNull(error);
            assert.isNotNull(file);

            var json = JSON.parse(file);
            assert.equal(json.name, 'Hello world!');

            done();
        });
    });

    it('should return a error instead file', function(done) {
        fileDatabase.getRow('table', 'notFound.json', function(error, file) {
            assert.isNotNull(error);
            assert.isUndefined(file);

            done();
        });
    });
});
