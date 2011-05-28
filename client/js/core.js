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

$(document).ready(function() {
	
	var yana = new Yana("http://localhost:8080");
	
	// enter user name
	$("#login_user").keyup(function() {
		if($(this).val().length>0)
			$("#login_submit").removeAttr("disabled");
		else 
			$("#login_submit").attr("disabled", "disabled");
	});
	$("#login_submit").click(function(e) {
		e.preventDefault();
		var username = $("#login_user").val();
		$("#login_dialog").hide("slow");
		yana.propagate({ type: "announcement", name: "user_join", params: {username: username} });
		yana.ready(function() {
			yana.join(username);
		});
	});
	
});

var Yana = function() {
	
	this.init();
	
	// establish websocket connection to server
	this.socket = new io.Socket();
	this.socket.connect();
	this.socket.on('connect', function(){});
	this.socket.on('message', $.proxy(this.processMessage, this));
	this.socket.on('disconnect', function(){	alert("connection lost.") });
	
	$("body").trigger("yana.ready");
};

Yana._commands = {};
Yana.registerCommand = function(command) {
	Yana._commands[command.prototype.name] = command;
};

Yana.prototype = {
	
	_initalized: false,
	
	init: function() {
		this.propagateQueue = new Array();
	},
	
	ready: function(callback) {
		if(this._initialized) callback();
		else $("body").bind("yana.ready", callback);
	},
	
	join: function(username) {
		
	},
	
	execute: function(command) {
		command.execute();
		this.propagate(command.getJsonObject());
	},
	
	propagate: function(jsonObject) {
		this.socket.send(jsonObject);
	},
	
	processMessage: function(message) {
		console.log(message);
	},
	
	executeExternal: function(commandJson) {
		var commandClass = Yana._commands[commandJson.name];
		var command = new commandClass(commandJson.params);
		command.execute();
	}
	
}

