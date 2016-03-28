console.log('-------------- Starting ------------');

var mic = require('./microphone'),
    wrtc = require('wrtc'),
    myConnectionId = 'call28892643582',
    peer,
    micStream;

//global for peerjs to use.
RTCPeerConnection = wrtc.RTCPeerConnection;
RTCSessionDescription = wrtc.RTCSessionDescription;
RTCIceCandidate = wrtc.RTCIceCandidate;
//require peer
require('peerjs/lib/exports.js');


// Create a Peer instance
peer = new Peer(myConnectionId, {
    key: 'mrl7pp3bfls1yvi',
    debug: 3,
    config: {
        iceServers: [
            { url: 'stun:stun.l.google.com:19302' },
            { url: 'stun:stun1.l.google.com:19302' }
        ]
    }
});

mic.startCapture();
mic.audioStream.on('data', function(data) {
    micStream = data
});

var peerConnectionId = 'answer28892643582',
    outgoingCall = peer.call(peerConnectionId, micStream);
