var Patch = function(params) {
	this.params = params;
	this.init();
};
Patch.prototype = {
	
	bufferSize: 1024,
	node: null,
	
	init: function() {
		this.node = yana.audioContext.createJavaScriptNode(this.bufferSize, 1, 1);
		this.node.onaudioprocess = $.proxy(this.processAudio, this);
	},
	
	connect: function(nodeOrDestination) {
		this.node.connect(nodeOrDestination);
	},
	
	processAudio: function(e) {
		// implement in subclasses
	},
	
	getElement: function() {
		return $('<div class="patch"></div');
	}
	
}

var SamplePatch = function(params) {
	SamplePatch.superclass.constructor.call(this, params);
};
_extend(SamplePatch, Patch, {
	
	name: "sample_patch",
	
	processAudio: function(e) {
		// put concrete audio implementation here
	},
	
});
Yana.registerPatch(SamplePatch);