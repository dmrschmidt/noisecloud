var ConnectCommand = function(params) {
	ConnectCommand.superclass.constructor.call(this, params); 
};

ConnectCommand.setup = function() {
	
	$(".output").live("mousedown", function(ev) {
		ev.stopPropagation();
		
		var outputId = $(this).data("id");
		
		var unbind = function() {
			yana.wiringCtx.clearRect(0,0,yana.wiringCtx.canvas.width, yana.wiringCtx.canvas.height);
			$("#space").unbind("mousemove mouseup");
			$(".input").unbind("mouseup", connectCallback);
		};
		
		var connectCallback = function() {
			var inputId = $(this).data("id");
			yana.execute(new ConnectCommand({
				from: outputId,
				to: inputId
			}));
			unbind();
		};
		
		var start = { x: ev.pageX - $("#space").offset().left, y: parseInt($(this).offset().top) + $("#space-container").scrollTop() + parseInt($(this).css("height"))/2 };
		$("#space").mousemove(function(ev2) {
			var end = { x: ev2.pageX - $("#space").offset().left, y: ev2.pageY + $("#space-container").scrollTop() };
			yana.wiringCtx.clearRect(0,0,yana.wiringCtx.canvas.width, yana.wiringCtx.canvas.height);
			yana.wiringCtx.lineWidth = 3;
			yana.wiringCtx.strokeStyle = "#FFFFFF";
			var middleX = start.x+(end.x-start.x)/2;
			yana.wiringCtx.beginPath();
			yana.wiringCtx.moveTo(start.x,start.y);
			yana.wiringCtx.bezierCurveTo(middleX,start.y,middleX,end.y,end.x,end.y);
			yana.wiringCtx.stroke();
		}).mouseup(function() {
			unbind();
		});
		
		$(".input").bind("mouseup", connectCallback);
		
		
	});
}

_extend(ConnectCommand, Command, {
	
	name: "connect",
	
	execute: function(externalCommand) {
		var startEl = $(".output[data-id='" +this.params.from + "']");
		var start = {
			x: parseInt(startEl.offset().left) + parseInt(startEl.css("width")) - $("#space").offset().left,
			y: parseInt(startEl.offset().top) + $("#space-container").scrollTop() + parseInt(startEl.css("height"))/2
		};
		
		var endEl = $(".input[data-id='" +this.params.to + "']");
		var end = {
			x: parseInt(endEl.offset().left) - $("#space").offset().left,
			y: parseInt(endEl.offset().top) + $("#space-container").scrollTop() + parseInt(endEl.css("height"))/2
		};
		
		var middleX = start.x+(end.x-start.x)/2;
		yana.connectionsCtx.lineWidth = 3;
		yana.connectionsCtx.strokeStyle = "#FFFFFF";
		yana.connectionsCtx.beginPath();
		yana.connectionsCtx.moveTo(start.x,start.y);
		yana.connectionsCtx.bezierCurveTo(middleX,start.y,middleX,end.y,end.x,end.y);
		yana.connectionsCtx.stroke();
	}
	
});

Yana.registerCommand(ConnectCommand);