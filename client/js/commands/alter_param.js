var AlterParamCommand = function(params, user) {
	AlterParamCommand.superclass.constructor.call(this, params);
};

AlterParamCommand.setup = function() {
	
	$(".controls input").live("focus", function(ev) {
		var patchId = $(this).parent().parent().data("id");
		var fieldName = $(this).attr('class');
		
		self = this;
		$(this).bind("blur", function() {
			yana.execute(new AlterParamCommand({
				patch: patchId,
				fieldName: fieldName,
				to: $(self).val()
			}));
		});
	});
}

_extend(AlterParamCommand, Command, {
	
	name: "alter_param",
	
	execute: function(externalCommand) {
		patch = yana.activePatches[this.params.patch];
		patch.updateValue(this.params.fieldName, this.params.to);
	}
});

Yana.registerCommand(AlterParamCommand);