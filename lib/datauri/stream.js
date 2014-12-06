/*
* datauri - A simple Data URI scheme generator
* https://github.com/heldr/datauri
*
* Copyright (c) 2014 Helder Santana
* Licensed under the MIT license.
* https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
*/

"use strict";

var path = require('path'),
    fs   = require('fs');

function onData(data) {
    /*jshint validthis:true */
    if (!data.match('base64,')) {
        this.base64 += data;
    }

    this.emit('data', data);
}

function onEnd() {
    /*jshint validthis:true */
    this.content += this.base64;

    this.emit('end');
    this.emit('encoded', this.content, this);
}

module.exports = function (fileName) {
    this.stream = fs.createReadStream(fileName, {encoding: 'base64'});

    onData.call(this, this.format(fileName, 0).content);
    this.stream
        .on('error', this.emit.bind(this, 'error'))
        .on('data', onData.bind(this))
        .on('end', onEnd.bind(this));
};
