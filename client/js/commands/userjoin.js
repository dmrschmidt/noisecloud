var UserJoinCommand = function(params) {
	UserJoinCommand.superclass.constructor.call(this, params); 
	
};
UserJoinCommand.setup = function() {
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
		yana.ready(function() {
			yana.join(username);
		});
	});
};
_extend(UserJoinCommand, Command, {
	
	name: "user_join",
	
	/**
	 * @param externalCommand true if the command was received from the server
	 **/
	execute: function(externalCommand) {
		
		if(!yana.users[this.params.username]) 
			yana.users[this.params.username] = new User(this.params.username);
		
		yana.users[this.params.username].setStatus("online");
		
	}
	
});
Yana.registerCommand(UserJoinCommand);
