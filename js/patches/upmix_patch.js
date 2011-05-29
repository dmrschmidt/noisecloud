var UpmixPatch = function(params) {
	UpmixPatch.superclass.constructor.call(this, params);
	this.params = {};
};
_extend(UpmixPatch, Patch, {
	
	name: "upmix_patch",
	title: "Upmix",
	
	processAudio: function(event) {
	
		// Get left input and output arrays
		var inputArrayL = event.inputBuffer.getChannelData(0);
		var outputArrayL = event.outputBuffer.getChannelData(0);
		var outputArrayR = event.outputBuffer.getChannelData(1);
        
		var n = inputArrayL.length;
        
		for (var i = 0; i < n; ++i) {
		    // copy to right channel
		    outputArrayL[i] = inputArrayL[i];
		    outputArrayR[i] = inputArrayL[i];

		}
	}	
	
});
Yana.registerPatch(UpmixPatch);
