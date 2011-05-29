var AddPatchCommand = function(params, user) {
	AddPatchCommand.superclass.constructor.call(this, params, user); 
};

AddPatchCommand.setup = function() {
	
	$("body").bind("yana.joined", function() {
		
		var generateNewPatchId = function() {
			return yana.username +"_"+ (new Date()).getTime();
		};
		
		$("#repository .patch").mousedown(function() {

			var patchName = $(this).data("name");
			var userEl = yana.getUser().element;

			$('<div id="dragicon"></div>').appendTo("body");
			$("#repository, #space")
				.mousemove(function(ev) {
					$("#dragicon").css({"left": ev.pageX+10, "top": ev.pageY+10 });
				})
				.mouseup(function() {
					$("#dragicon").remove();
				});
			$(userEl)
				.hover(function() { $(this).toggleClass("allowed"); })
				.mouseup(function(ev) {
					$("#dragicon").remove();
					var command = new AddPatchCommand({
						id: generateNewPatchId(),
						x: ev.pageX - $(userEl).offset().x,
						y: ev.pageX - $(userEl).offset().y,
						name: patchName
					});
					yana.execute(command);
				});


		});
		
	});
}

_extend(AddPatchCommand, Command, {
	
	name: "add_patch",
	
	execute: function(externalCommand) {
		var patch = new Yana._patches[this.params.name]();
		var userEl = yana.users[this.user].element;
		patch.getElement()
			.appendTo(userEl)
			.css({ left: this.params.x, top: this.params.y });
		
		$("body").trigger("yana.patch.added", patch);
	}
	
});

Yana.registerCommand(AddPatchCommand);



var MovePatchCommand = function(params) {
	MovePatchCommand.superclass.constructor.call(this, params); 
};

MovePatchCommand.setup = function() {
	
	$("body").bind("yana.patch.added", function(ev, patch) {
		patch.getElement().draggable({
			stop: function() {
				var command = new MovePatchCommand({
					x: $(this).css("left"),
					y: $(this).css("top"),
					name: patchName
				});
				yana.execute(command);
			}
		});
	});
	
	
}

_extend(MovePatchCommand, Command, {
	
	name: "move_patch",
	
	execute: function(externalCommand) {
		
		if(externalCommand) {
			
		}
		
	}
	
});

Yana.registerCommand(MovePatchCommand);