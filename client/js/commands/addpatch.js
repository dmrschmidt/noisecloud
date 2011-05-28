var AddPatchCommand = function(params) {
	AddPatchCommand.superclass.constructor.call(this, params); 
};

AddPatchCommand.setup = function() {
	$("body").bind("yana.joined", function() {
		
		$("#repository .patch").mousedown(function() {

			var patchName = $(this).data("name");
			var userEl = yana.getUser().element;

			$('<div id="newpatch"></div>').appendTo("body");
			$("#repository, #space")
				.mousemove(function(ev) {
					$("#newpatch").css({"left": ev.pageX+10, "top": ev.pageY+10 });
				})
				.mouseup(function() {
					$("#newpatch").remove();
				});
			$(userEl)
				.hover(function() { $(this).toggleClass("allowed"); })
				.mouseup(function(ev) {
					$("#newpatch").remove();
					var command = new AddPatchCommand({
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
		
		var patch = yana.patches[params.name];
		
		
	}
	
});

Yana.registerCommand(AddPatchCommand);

var MovePatchCommand = function(params) {
	MovePatchCommand.superclass.constructor.call(this, params); 
};

MovePatchCommand.setup = function() {
	$("#space .patch").draggable();
}

_extend(MovePatchCommand, Command, {
	
	name: "move_patch",
	
	execute: function(externalCommand) {
		
		
		
	}
	
});

Yana.registerCommand(MovePatchCommand);