var express = require('express'),
    http    = require('http'),
    net     = require('net'),
    child   = require('child_process');

var app         = express(),
    httpServer  = http.createServer(app);


//Start server and log uncaughtExceptions
httpServer.listen(3000);
console.error('-------------- Server started on port 3000 ------------');

process.on('uncaughtException', function(err) {
    console.log(err);
});

//kickoff
app.get('/', function(req, res) {
    var date = new Date();

    res.writeHead(200, {
        'Date':date.toUTCString(),
        'Connection':'close',
        'Cache-Control':'private',
        'Content-Type':'video/webm',
        'Server':'CustomStreamer/0.0.1'
    });

    var tcpServer = net.createServer(function (socket) {
        socket.on('data', function (data) {
            res.write(data);
        });
        socket.on('close', function(had_error) {
            res.end();
        });
    });

    tcpServer.maxConnections = 1;

    tcpServer.listen(function() {
        var cmd = 'gst-launch-0.10';
        var options = {};
        var args =
                [ 'alsasrc', 'device=plughw:1,0',
                    '!', 'audioconvert',
                    '!', 'audioresample',
                    '!', 'opusenc',
                    '!', 'rtpopuspay',
                    '!', 'tcpclientsink', 'host=localhost',
                    'port='+tcpServer.address().port];


        var gstMuxer = child.spawn(cmd, args, options);

        gstMuxer.stderr.on('data', function(data){
            console.error('-------------- gstMuxer.stderr.on: data : Error ------------');
            console.error(data.toString());
        });
        gstMuxer.on('exit', function(code){
            if (code != null) {
                console.error('-------------- gstMuxer.stderr.onError: exit: Error ------------');
                console.log('GStreamer error, exit code ' + code);
            }

        });
        res.connection.on('close', function() {
            gstMuxer.kill();
        });
    });
});