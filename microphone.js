/**
 * Created by Badr on 28/03/2016.
 */

var spawn       = require('child_process').spawn,
    PassThrough = require('stream').PassThrough,
    lame        = require('lame');

var ps      = null,
    audio   = new PassThrough,
    info    = new PassThrough;

var start = function(options) {
    options = options || {};

    if(ps == null) {
        ps = spawn('arecord', ['-D', 'plughw:1,0', '-f', 'dat']);

        if(options.mp3 === true) {
            var encoder = new lame.Encoder( {
                channels: 2,
                bitDepth: 16,
                sampleRate: 44100
            });

            ps.stdout.pipe(encoder);
            encoder.pipe(audio);
            ps.stderr.pipe(info);

        } else {
            ps.stdout.pipe(audio);
            ps.stderr.pipe(info);

        }
    }
};

var stop = function() {
    if(ps) {
        ps.kill();
        ps = null;
    }
};

exports.audioStream = audio;
exports.infoStream = info;
exports.startCapture = start;
exports.stopCapture = stop;