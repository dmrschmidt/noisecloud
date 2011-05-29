var GainPatch = function(params) {
	GainPatch.superclass.constructor.call(this, params);
};
_extend(GainPatch, Patch, {
	
	name: "gain_patch",
	title: "Gain",
	gain: 10,
	
	init: function() {
		GainPatch.superclass.init.call(this);
		this.node = yana.audioContext.createGainNode();
		this.node.gain.value = this.gain;
	},
	
	editableFields: function() {
		// implement in subclasses
		return ['gain'];
	},
	
});
Yana.registerPatch(GainPatch);
