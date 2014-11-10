var express = require('express');
var bodyParser = require('body-parser');
var socketIO = require('socket.io');

var app = express();
var server = require('http').createServer(app);
var io = socketIO.listen(server);

app.use(bodyParser.json());

app.post('/command', function(req, res){
  var command = req.body;
  io.sockets.emit('command', {
    direction: command.direction
  });
  res.status(200).send(command);
});

server.listen(9000, function () {
  var port = server.address().port
  console.log('port:', port)
});
