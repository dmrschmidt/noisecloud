var DrumPatch = function(params) {
	DrumPatch.superclass.constructor.call(this, params);
};
_extend(DrumPatch, Patch, {
	
	name: "drum_patch",
	frequency: 64,
	currentSample: 0,
	
	processAudio: function(e) {
		var p = 0;
		var output = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < output.length; i++) {
			this.currentSample++;
			if(this.currentSample % 44100 < 22025)
				output[i] = Math.sin(this.frequency * Math.PI * (p++ / output.length));
			else
				output[i] = 0;
		}
	},
	
});
Yana.registerPatch(DrumPatch);
