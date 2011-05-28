var http = require('http'), 
		io = require('socket.io'),
		url = require('url'),
		fs = require('fs');

server = http.createServer(function(req, res){
	var path = url.parse(req.url).pathname;
	if(path == '/') path = '/index.html';
	
	fs.readFile(__dirname + path, function(err, data){
		if (err) { send404(console, err, res); return };
		res.writeHead(200, {'Content-Type': 'text/html'})
		res.write(data, 'utf8');
		res.end();
	});
});

send404 = function(console, err, res){
	console.log('file error ' + err);
	res.writeHead(404);
	res.write('404');
	res.end();
};


server.listen(80);

// socket.io, I choose you
var socket				= io.listen(server),
		command_stack = [];

socket.on('connection', function(client){
	// new client is here, send the command stack
	console.log('new user ' + client.sessionId + ' joined');
	
	client.send(create_message('command', 'full_stack',
		{ 'command_stack': command_stack }
	));
	
	// client.broadcast(create_message('announcement', 'user_join',
	// 	{'message': client.sessionId + ' has joined'}
	// ));
	
	client.on('message', function(message){ process_message(client, message) })
	client.on('disconnect', function(){	 })
});


function create_message(type, name, params) {
	return {
		'type': type,
		'name': name,
		'params': params
	}
}


function process_message(client, message) {
	switch(message.type) {
		case 'command':
			command_stack.push(message);
			client.broadcast(message);
			break;
	}
};