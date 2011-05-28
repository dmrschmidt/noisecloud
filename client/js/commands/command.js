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