var RandomPatch = function(id, params) {
	RandomPatch.superclass.constructor.call(this, id, params);
};
_extend(RandomPatch, Patch, {
	
	name: "random_patch",
	title: "Random",
	
	processAudio: function(e) {
		var output = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < output.length; i++) {
				output[i] = Math.random();
		}
	}
	
});
Yana.registerPatch(RandomPatch);
