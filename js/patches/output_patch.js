var OutputPatch = function(id, params) {
	OutputPatch.superclass.constructor.call(this, id, params);
};
_extend(OutputPatch, Patch, {
	
	name: "output_patch",
	title: "Output",
	
	init: function() {
		
		OutputPatch.superclass.init.call(this);
		this.node = yana.audioContext.createGainNode();
	},
	
	toggleOn: function() {
		
		this.node = yana.audioContext.destination;
		for(var i=0; i<this.connectedNodes.length; i++)
			this.connectedNodes[i].node.connect(this.node);
	},
	
	toggleOff: function() {
		
		this.node = yana.audioContext.createGainNode();
		for(var i=0; i<this.connectedNodes.length; i++)
			this.connectedNodes[i].node.connect(this.node);
	}
	
	
});
Yana.registerPatch(OutputPatch);
