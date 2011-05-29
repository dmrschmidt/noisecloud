var GainPatch = function(id, params) {
	GainPatch.superclass.constructor.call(this, id, params);
};
_extend(GainPatch, Patch, {
	
	name: "gain_patch",
	title: "Gain",
	params: {gain: 10},
	
	init: function() {
		GainPatch.superclass.init.call(this);
		this.node = yana.audioContext.createGainNode();
		this.node.gain.value = this.params.gain;
	},
	
	editableFields: function() {
		// implement in subclasses
		return ['gain'];
	},
	
});
Yana.registerPatch(GainPatch);
