var DrumPatch = function(params) {
	DrumPatch.superclass.constructor.call(this, params);
};
_extend(DrumPatch, Patch, {
	
	name: "drum_patch",
	title: "Drum",
	frequency: 12,
	currentSample: 0,
	samplingRate: 44100,
	beats: [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
	currentBeatCount: -1,
	
	processAudio: function(e) {
		var p = 0;
		this.currentBeatCount = (this.currentBeatCount + 1) % this.beats.length;
		playCurrentBeat = this.beats[this.currentBeatCount];
		var output = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < output.length; i++) {
			this.currentSample++;
			if(playCurrentBeat)
				output[i] = Math.sin(this.frequency * Math.PI * (p++ / output.length));
			else
				output[i] = 0;
		}
	},
	
});
Yana.registerPatch(DrumPatch);
