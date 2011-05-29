var DelayPatch = function(params) {
	DelayPatch.superclass.constructor.call(this, params);
};
_extend(DelayPatch, Patch, {
	
	name: "delay_patch",
	title: "Delay",
	delayTime: 32.0,
	
	init: function() {
		this.node = yana.audioContext.createDelayNode();
		this.node.delayTime.value = this.delayTime;
	},
	
	
});
Yana.registerPatch(DelayPatch);
