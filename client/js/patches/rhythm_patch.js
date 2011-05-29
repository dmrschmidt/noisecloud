var RhythmPatch = function(id, params) {
	RhythmPatch.superclass.constructor.call(this, id, params);
	this.params = {
		frequency: 12,
		beats: [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
	};
};
_extend(RhythmPatch, Patch, {
	
	name: "rhythm_patch",
	title: "Rhythm",
	currentSample: 0,
	currentBeatCount: -1,
	
	processAudio: function(e) {
		var p = 0;
		this.currentBeatCount = (this.currentBeatCount + 1) % this.params.beats.length;
		playCurrentBeat = this.params.beats[this.currentBeatCount];
		var output = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < output.length; i++) {
			this.currentSample++;
			if(playCurrentBeat)
				output[i] = Math.sin(this.params.frequency * Math.PI * (p++ / output.length));
			else
				output[i] = 0;
		}
	},
	
	editableFields: function() {
		// implement in subclasses
		return ['frequency', 'beats'];
	},
	
});
Yana.registerPatch(RhythmPatch);
