/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2014 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

"use strict";

var path       = require('path'),
    fs         = require('fs'),
    mimer      = require('mimer'),
    uri        = require('../template/uri'),
    css        = require('../template/css'),
    existsSync = fs.existsSync,
    exists     = fs.exists,
    stream     = require('./stream');

module.exports = {
    format: function (fileName, fileContent) {
        fileContent   = (fileContent instanceof Buffer) ? fileContent : new Buffer(fileContent);
        this.fileName = fileName;
        this.base64   = fileContent.toString('base64');
        this.mimetype = mimer(fileName);
        this.content  = uri.call(this);

        return this;
    },
    encode: function (fileName, handler) {
        var self = this;

        if (!handler) {
            exists(fileName, stream.bind(this, fileName));

            return self;
        }

        exists(fileName, function () {
            fs.readFile(fileName, function (err, fileContent) {
                var datauri = null;

                if (err) {
                    return handler.call(self, err);
                }

                datauri = self.format(fileName, fileContent);

                handler.call(self, null, datauri.content, datauri);
            });
        });

        return self;
    },
    encodeSync: function (fileName) {
        if (!fileName || !fileName.trim || fileName.trim() === '') {
            throw new Error('Insert a File path as string argument');
        }

        if (existsSync(fileName)) {
            var fileContent = fs.readFileSync(fileName);

            return this.format(fileName, fileContent).content;
        } else {
            throw new Error('The file ' + fileName + ' was not found!');
        }

    }
};
