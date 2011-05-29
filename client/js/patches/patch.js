var Patch = function(id) {
	this.id = id;
	this.element = $(
		'<div class="patch input" data-id="' + this.id +'"><div class="handle"></div><div class="output" data-id="' + this.id +'"></div></div>'
	);
	this.init();
};

Patch.prototype = {
	
	bufferSize: 1024,
	node: null,
	
	init: function() {
		this.node = yana.audioContext.createJavaScriptNode(this.bufferSize, 1, 1);
		this.node.onaudioprocess = $.proxy(this.processAudio, this);
		// temporary for playing
		// this.connect(yana.audioContext.destination);
	},
	
	connect: function(nodeOrDestination) {
		this.node.connect(nodeOrDestination.node);
	},
	
	processAudio: function(e) {
		// implement in subclasses
	},
	
	getElement: function() {
		return this.element;
	}
	
}

var SamplePatch = function(id) {
	SamplePatch.superclass.constructor.call(this, id); 
};
_extend(SamplePatch, Patch, {
	
	name: "sample_patch",
	title: "Sample",
	
	processAudio: function(e) {
		// put concrete audio implementation here
	}
});
Yana.registerPatch(SamplePatch);