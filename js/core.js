var yana;
$(document).ready(function() {
	
	yana = new Yana();

});

var Yana = function() {
	
	this.init();
	
	// establish websocket connection to server
	this.socket = new io.Socket();
	this.socket.connect();
	this.socket.on('connect', function(){});
	this.socket.on('message', $.proxy(this.processMessage, this));
	this.socket.on('disconnect', function(){ alert("connection lost.") });
	
	$("body").trigger("yana.ready");
	this._ready = true;
};

Yana._commands = {};
Yana.registerCommand = function(command) {
	Yana._commands[command.prototype.name] = command;
};

Yana._patches = {};
Yana.registerPatch = function(patch) {
	Yana._patches[patch.prototype.name] = patch;
	$(document).ready(function() {
		$('<div class="patch" data-name="' + patch.prototype.name + '"><span class="name">' + patch.prototype.title +'</span></div>')
			.appendTo("#repository");
	});
};

Yana.prototype = {
	
	_ready: false,
	
	init: function() {
		
		this.users = {};
		
		var connectionsCanvas = document.getElementById('connections');
		var wiringCanvas = document.getElementById('wiring');
		
		var setCanvasSize = function() {
			wiringCanvas.width = 2000;
			wiringCanvas.height = 2000;
			connectionsCanvas.width = 2000;
			connectionsCanvas.height = 2000;
		};
		setCanvasSize();
		
		this.connectionsCtx = connectionsCanvas.getContext('2d');
		this.wiringCtx = wiringCanvas.getContext('2d');
		
		this.activePatches = {};
		
		// set up the AudioContext
		window.AudioContext = window.webkitAudioContext;
		this.audioContext = new AudioContext();
		
		$("body").disableSelection();
		
		// setup event handlers for commands
		for(key in Yana._commands) {
			Yana._commands[key].setup();
		}

	},
	
	getUser: function() {
		return this.users[this.username];
	},
	
	ready: function(callback) {
		if(this._ready) callback();
		else $("body").bind("yana.ready", callback);
	},
	
	join: function(username) {
		this.username = username;
		this.execute(new UserJoinCommand({username: username}));
		this.users[this.username].element
			.addClass("ownspace")
			.find(".mask").remove();
		$("body").trigger("yana.joined");
		// send our output to sound card
		this.users[this.username].outputPatch.toggleOn();
	},
	
	execute: function(command) {
		command.execute();
		this.propagate(command.getJsonObject());
	},
	
	propagate: function(jsonObject) {
		jsonObject.user = this.username;
		this.socket.send(jsonObject);
	},
	
	processMessage: function(jsonObject) {
		if(jsonObject.type==="command") {
			var commandClass = Yana._commands[jsonObject.name];
			var command = new commandClass(jsonObject.params, jsonObject.user);
			command.execute(true);
		}
	}
	
}


var User = function(username) {
	this.username = username;
	this.element = $(
		'<div class="userspace"><div class="handle"><span class="username">' + username + '</span></div>' +
		'<div class="output input" data-id="' + this.username + '_out"></div>' +
		'<div class="mask"></div></div>'
	).appendTo("#space");
	this.color = "#"+Math.floor(Math.random()*16777215).toString(16);
	this.element.css("border-color", this.color);
	this.element.find(".handle").css("background-color", this.color);
	
	this.outputPatch = new OutputPatch(this.username + "_out");
	this.outputPatch.element = this.element.find("output");
	yana.activePatches[this.username + "_out"] = this.outputPatch;
	
	$("body").trigger("yana.user.created", this);
	this.element.draggable({handle: ".handle"});
} 

User.prototype = {
	
	setStatus: function(status) {
		
	}
	
}

/**
 * Utility to set up the prototype, constructor and superclass properties to
 * support an inheritance strategy that can chain constructors and methods.
 *
 * @param {Function} subc   the object to modify
 * @param {Function} superc the object to inherit
 * @param {Object} overrides  additional properties/methods to add to the
 *                              subclass prototype.  These will override the
 *                              matching items obtained from the superclass 
 *                              if present.
 */
function _extend(subc, superc, overrides) {
    if (!superc||!subc) {
        throw new Error("_extend failed, please check that " +
                        "all dependencies are included.");
    }
    var F = function() {};
    F.prototype=superc.prototype;
    subc.prototype=new F();
    subc.prototype.constructor=subc;
    subc.superclass=superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor=superc;
    }

    if (overrides) {
        for (var i in overrides) {
            subc.prototype[i]=overrides[i];
        }
    }
}

