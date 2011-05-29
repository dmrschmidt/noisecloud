var Command = function(params, user) {
	this.user = user || yana.username;
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