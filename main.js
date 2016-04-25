console.log('-------------- Starting ------------');

var mic = require('./microphone'),
    express = require('express'),
    http    = require('http'),
    fs      = require('fs'),
    net     = require('net');

http.createServer(function (req, res) {
    //TODO
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

