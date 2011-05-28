var SinePatch = function(params) {
	SinePatch.superclass.constructor.call(this, params);
};
_extend(SinePatch, Patch, {
	
	name: "sine_patch",
	frequency: 128,
	
	processAudio: function(e) {
		var p = 0;
		var output = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < output.length; i++) {
				output[i] = Math.sin(this.frequency * Math.PI * (p++ / output.length));
		}
	},
	
});
Yana.registerPatch(SinePatch);
