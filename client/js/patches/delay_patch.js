var DelayPatch = function(params) {
	DelayPatch.superclass.constructor.call(this, params);
};
_extend(DelayPatch, Patch, {
	
	name: "delay_patch",
	title: "Delay",
	delayTime: 32.0,
	
	init: function() {
		DelayPatch.superclass.init.call(this);
		this.node = yana.audioContext.createDelayNode();
		this.node.delayTime.value = this.delayTime;
	},
	
	editableFields: function() {
		// implement in subclasses
		return ['delayTime'];
	},
	
	
});
Yana.registerPatch(DelayPatch);
