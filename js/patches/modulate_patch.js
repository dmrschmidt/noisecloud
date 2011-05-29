var ModulatePatch = function(params) {
	this.params = {
		pitchRate: 1.0
	};
	
	ModulatePatch.superclass.constructor.call(this, params);
	
	
};
_extend(ModulatePatch, Patch, {
	
	name: "modulate_patch",
	title: "AmpMod",
	
	phaseL: 0.0,
	phaseR: 0.0,
	
	processAudio: function(event) {
		var phaseIncrL = 2.0 * Math.PI * 440.0 / 44100.0;
		var phaseIncrR = 2.0 * Math.PI * (440.0 * 1.1) / 44100.0; // modulate slightly different on right channel
		var kTwoPi = 2.0 * Math.PI;
	
		// Get left/right input and output arrays
		var inputArrayL = event.inputBuffer.getChannelData(0);
		var inputArrayR = event.inputBuffer.getChannelData(1);
		var outputArrayL = event.outputBuffer.getChannelData(0);
		var outputArrayR = event.outputBuffer.getChannelData(1);
        
		var n = inputArrayL.length;
        
		for (var i = 0; i < n; ++i) {
		    var sampleL = Math.sin(this.phaseL);
		    var sampleR = Math.sin(this.phaseR);
        
		    this.phaseL += this.params.pitchRate * phaseIncrL;
		    this.phaseR += this.params.pitchRate * phaseIncrR;
		    if (this.phaseL > kTwoPi) this.phaseL -= kTwoPi;
		    if (this.phaseR > kTwoPi) this.phaseR -= kTwoPi;
        
		    // Amplitude modulation effect
		    outputArrayL[i] = inputArrayL[i] * sampleL;
		    outputArrayR[i] = inputArrayR[i] * sampleR;

		}
	}	
	
});
Yana.registerPatch(ModulatePatch);
