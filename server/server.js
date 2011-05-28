var http = require('http'), 
    io = require('socket.io'),
    fs = require('fs');

server = http.createServer(function(req, res){
    // your normal server code
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.end('<h1>Hello world</h1>');
    
    fs.readFile(__dirname + '/client.html', function(err, data){
      if (err) console.log('error');
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(data, 'utf8');
      res.end();
    });
});

server.listen(80);

// socket.io, I choose you
var socket        = io.listen(server),
    command_stack = [];

socket.on('connection', function(client){
  // new client is here, send the command stack
  client.send({ 'command_stack': command_stack });
  // client.broadcast({ 'announcement': client.sessionId + ' connected' });
  client.on('message', function(message){ console.log('jap') })
  client.on('disconnect', function(){  })
});