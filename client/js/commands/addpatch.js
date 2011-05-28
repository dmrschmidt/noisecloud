var AddPatchCommand = function(params) {
	AddPatchCommand.superclass.constructor.call(this, params); 
};

AddPatchCommand.setup = function() {
	$("body").bind("yana.joined", function() {
		
		$("#repository .patch").mousedown(function() {

			var patchType = $(this).data("type");
			var userEl = yana.getUser().element;

			$('<div id="newpatch"></div>').appendTo("body");
			$("#repository, #space")
				.mousemove(function(ev) {
					$("#newpatch").css({"left": ev.pageX, "top": ev.pageY });
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
						type: patchType
					});
					yana.execute(command);
				});


		});
		
	});
}

_extend(AddPatchCommand, Command, {
	
	name: "add_patch",
	
	execute: function(externalCommand) {
		
		
		
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