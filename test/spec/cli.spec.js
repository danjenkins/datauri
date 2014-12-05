describe('Data-uri Client', function () {
    'use strict';

    var fs        = require('fs'),
        should    = require('chai').should(),
        fixture   = 'test/fixture.gif',
        child     = require('child_process'),
        execute   = child.exec,
        cli       = './bin/datauri ',
        expected  = new RegExp('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'),
        dUri, cssContent;


    describe('generate a data-uri string', function () {
        it('should give advice when a user do not type anything after datauri', function (done) {
            var expected = new RegExp('How to use Data-uri client:');

            execute(cli, function (err, stdout) {
                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.match(expected);

                done();
            });
        });

        it('should run datauri through a simple file', function (done) {
            execute(cli + fixture, function (err, stdout) {
                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.match(expected);

                done();
            });
        });
    });

});
