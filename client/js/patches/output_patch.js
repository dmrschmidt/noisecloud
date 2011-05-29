var OutputPatch = function(params) {
	OutputPatch.superclass.constructor.call(this, params);
};
_extend(OutputPatch, Patch, {
	
	name: "output_patch",
	title: "Output",
	
	init: function() {
		this.node = yana.audioContext.createGainNode();
	},
	
	toggleOn: function() {
		
		this.node = yana.audioContext.destination;
		for(var i=0; i<this.connectedNodes.length; i++)
			this.connectedNodes[i].node.connect(this.node);
	}
	
	
});
Yana.registerPatch(OutputPatch);
