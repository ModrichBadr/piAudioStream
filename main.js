var mic = require('./microphone');

console.log('-------------- Starting ------------');

mic.startCapture();
mic.audioStream.on('data', function(data) {
    console.log('----------- Data From Microphone');
    console.log(data);
});