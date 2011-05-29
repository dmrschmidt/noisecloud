var MixPatch = function(params) {
	MixPatch.superclass.constructor.call(this, params);
};
_extend(MixPatch, Patch, {
	
	name: "mix_patch",
	title: "Mixer",
	
	// fake an actual mixer
	init: function() {
		this.node = yana.audioContext.createGainNode();
		this.node.gain.value = 1;
	},
	
});
Yana.registerPatch(MixPatch);
