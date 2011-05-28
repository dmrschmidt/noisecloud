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
var socket        = io.listen(server),
		command_stack = [],
		session_names = {};


socket.on('connection', function(client){
	// new client is here, send the command stack
	console.log('new user ' + client.sessionId + ' joined');
	
	client.send(create_message('command', 'full_stack',
		{ 'command_stack': command_stack }
	));
	
	client.on('message', function(message){ process_message(client, message) })
	client.on('disconnect', function(){
		username = session_names[client.sessionId];
		create_message('command', 'user_leave',
			{ 'username': username });
		console.log(username + ' (' + client.sessionId + ') disconnected');
	})
});


function create_message(type, name, params) {
	return {
		'type': type,
		'name': name,
		'params': params
	}
}


function process_message(client, message) {
	console.log(client.sessionId + ' sent ' + JSON.stringify(message));
	command_stack.push(message);
	client.broadcast(message);
	
	// if a new user joined, store his name for his sessionId
	if(message.name == 'user_join') {
		session_names[client.sessionId] = message.params.username;
	}
};