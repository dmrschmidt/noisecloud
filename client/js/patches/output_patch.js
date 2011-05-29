var OutputPatch = function(params) {
	OutputPatch.superclass.constructor.call(this, params);
};
_extend(OutputPatch, Patch, {
	
	name: "output_patch",
	title: "Output",
	delayTime: 32.0,
	
	init: function() {
		yana.audioContext.createJavaScriptNode(this.bufferSize, 1, 1);
		this.connect(yana.audioContext.destination);
	},
	
	
});
// Yana.registerPatch(OutputPatch);
