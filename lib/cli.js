"use strict";

var args    = process.argv,
    fs      = require('fs'),
    path    = require('path'),
    DataURI = require('./datauri/module');

if (args.length > 2) {

    var cls = args[4] || '',
        uri = new DataURI(args[2]),
        content;

    if (args.length < 4) {
        content = uri.content;
        console.log(content);
    }

} else {
    console.log('\nHow to use Data-uri client:\n\ndatauri <target_file>\ndatauri <target_file> <css_output>\ndatauri <target_file> <css_output> <css_class_name>\n');
}
