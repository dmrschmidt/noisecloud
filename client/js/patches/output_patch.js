var OutputPatch = function(params) {
	OutputPatch.superclass.constructor.call(this, params);
};
_extend(OutputPatch, Patch, {
	
	name: "output_patch",
	title: "Output",
	
	init: function() {
		OutputPatch.superclass.init.call(this);
		this.node = yana.audioContext.destination;
	},
	
	
});
Yana.registerPatch(OutputPatch);
