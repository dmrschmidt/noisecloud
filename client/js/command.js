var Command = function(params) {
	this.params = params;
};
Command.prototype = {
	
	getJsonObject: function() {
		return {
			"type": "command",
			"name": this.name,
			"params": this.params
		}
	}
}


var AddUserCommand = function(params) {
	AddSpaceCommand.superclass.constructor.call(this, params); 
};
_extend(AddUserCommand, Command, {
	
	name: "add_user";
	
	execute: function() {
		
	}
	
});
Yana.registerCommand(AddUserCommand)