var DelayPatch = function(id, params) {
	this.params = {delayTime: 32.0};
	DelayPatch.superclass.constructor.call(this, id, params);
};
_extend(DelayPatch, Patch, {
	
	name: "delay_patch",
	title: "Delay",
	
	init: function() {
		DelayPatch.superclass.init.call(this);
		this.node = yana.audioContext.createDelayNode();
		this.reloadStatic();
	},
	
	reloadStatic: function() {
		this.node.delayTime.value = this.params.delayTime;
	}
	
	
});
Yana.registerPatch(DelayPatch);
