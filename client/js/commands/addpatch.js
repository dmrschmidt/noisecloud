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
			
			var unbind = function() {
				$(userEl).unbind("mouseup hover");
				$("#repository, #space").unbind("mousemove mouseup");
			};

			$('<div id="dragicon"></div>').appendTo("body");
			$("#repository, #space")
				.mousemove(function(ev) {
					$("#dragicon").css({"left": ev.pageX+10, "top": ev.pageY+10 });
				})
				.mouseup(function() {
					$("#dragicon").remove();
					unbind();
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
					unbind();
				});
				
			

		});
		
	});
}

_extend(AddPatchCommand, Command, {
	
	name: "add_patch",
	
	execute: function(externalCommand) {
		var patch = new Yana._patches[this.params.name](this.params.id);
		var userEl = yana.users[this.user].element;
		patch.getElement()
			.appendTo(userEl)
			.css({ left: this.params.x, top: this.params.y });
		if(this.user==yana.username)
			patch.getElement().draggable({containment: userEl, handle: ".handle"});
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
					id: patch.id
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