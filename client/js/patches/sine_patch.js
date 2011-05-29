var SinePatch = function(id, params) {
	SinePatch.superclass.constructor.call(this, id, params);
};
_extend(SinePatch, Patch, {
	
	name: "sine_patch",
	title: "Sine",
	params: {frequency: 20},
	
	processAudio: function(e) {
		var p = 0;
		var output = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < output.length; i++) {
				output[i] = Math.sin(this.params.frequency * Math.PI * (p++ / output.length));
		}
	},
	
	editableFields: function() {
		// implement in subclasses
		return ['frequency'];
	},
	
});
Yana.registerPatch(SinePatch);
