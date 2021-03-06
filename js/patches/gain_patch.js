var GainPatch = function(id, params) {
	this.params = {gain: 10};
	GainPatch.superclass.constructor.call(this, id, params);
};
_extend(GainPatch, Patch, {
	
	name: "gain_patch",
	title: "Gain",
	
	init: function() {
		GainPatch.superclass.init.call(this);
		this.node = yana.audioContext.createGainNode();
		this.reloadStatic();
	},
	
	reloadStatic: function() {
		this.node.gain.value = this.params.gain;
	}
	
});
Yana.registerPatch(GainPatch);
