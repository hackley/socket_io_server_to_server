var http = require('http');
var server = http.createServer();
var socketIO = require('socket.io-client');
var prompt = require('prompt');

prompt.start();

var promptGets = {
  properties: {
    ip: {
      required: true,
      description: 'Controller IP',
      type: 'string',
      default: '0.0.0.0'
    },
    port: {
	    required: true,
	    description: 'Controller Port',
		  type: 'string',
		  default: '9000'
    }
  }
};

prompt.get(promptGets, function (err, result) {
  var connectionUrl = 'http://' + result.ip + ':' + result.port;
  var socket = socketIO(connectionUrl);

  socket.on('connect', function(){
    console.log("Socket connected to", connectionUrl);
  });

  socket.on('disconnect', function(){
    console.log("Socket disconnected");
  });

  socket.on('command', function(data){
    console.log("command:", data);
  });

  server.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Client server running at http://%s:%s', host, port)
  });
});
