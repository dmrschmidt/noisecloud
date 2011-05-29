var GainPatch = function(params) {
	GainPatch.superclass.constructor.call(this, params);
};
_extend(GainPatch, Patch, {
	
	name: "gain_patch",
	title: "Gain",
	gain: 10,
	
	init: function() {
		this.node = yana.audioContext.createGainNode();
		this.node.gain.value = this.gain;
	},
	
	
});
Yana.registerPatch(GainPatch);
