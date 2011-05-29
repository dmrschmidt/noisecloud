var ConvolverPatch = function(params) {
	ConvolverPatch.superclass.constructor.call(this, params);
};
_extend(ConvolverPatch, Patch, {
	
	name: "convolver_patch",
	title: "Convolver",
	
	init: function() {
		this.node = yana.audioContext.createConvolver();
		// this.node.gain.value = this.gain;
	},
	
	
});
Yana.registerPatch(ConvolverPatch);
