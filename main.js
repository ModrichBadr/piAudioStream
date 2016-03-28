console.log('-------------- Starting ------------');

var mic = require('./microphone'),
    express = require('express'),
    http    = require('http'),
    fs      = require('fs'),
    net     = require('net');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'audio/mp3' });

    mic.startCapture({ mp3: true });
    console.log('---------- Audio Stream --------');
    console.log(mic.audioStream);

    mic.audioStream.on('data', function(data) {
        fs.createReadStream(path).pipe(data)
    });

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

