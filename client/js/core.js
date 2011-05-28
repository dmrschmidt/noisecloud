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
	$("#login_user").keypress(function() {
		if($(this).val().length>0)
			$("#login_submit").removeAttr("disabled");
		else 
			$("#login_submit").attr("disabled", "disabled");
	});
	$("#login_submit").click(function(e) {
		e.preventDefault();
		var username = $("#login_user").val();
		$("#login_dialog").hide("slow");
		yana.ready(function() {
			yana.join(username);
		});
	});
	
});

var Yana = function(server) {
	
	// establish websocket connection to server
	
	
	// get command stack from server
	
	$("body").trigger("yana.ready")
};

Yana.registerCommand = function(command) {
	Yana._commands[command.name] = command
};

Yana.prototype = {
	
	_initalized = false,
	
	ready: function(callback) {
		if(this._initialized) callback();
		else $("body").bind("yana.ready", callback);
	},
	
	join: function(username) {
		
	},
	
	execute: function(commandJson) {
		
	}
	
}

