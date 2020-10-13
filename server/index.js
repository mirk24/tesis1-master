const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;
const socketIo = require('socket.io');

const port= new Serialport('COM4', {
    baudRate: 2400
});

const parser = port.pipe(new Readline({delimiter:'\r\n'}));

parser.on('open', function () {
    console.log('connection is opened');
});

parser.on('data', function (data) {
    console.log(data);
});