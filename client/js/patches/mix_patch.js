var MixPatch = function(id, params) {
	MixPatch.superclass.constructor.call(this, id, params);
};
_extend(MixPatch, Patch, {
	
	name: "mix_patch",
	title: "Mixer",
	
	// fake an actual mixer
	init: function() {
		MixPatch.superclass.init.call(this);
		this.node = yana.audioContext.createGainNode();
		this.node.gain.value = 1;
	},
	
});
Yana.registerPatch(MixPatch);
