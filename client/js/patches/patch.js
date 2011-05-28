var Patch = function(id) {
	this.id = id;
	this.element = $('<div class="patch" id="' + this.id +'"></div');
};
Patch.prototype = {
	
	getElement: function() {
		
		return this.element;
	}
	
}

var SamplePatch = function(id) {
	SamplePatch.superclass.constructor.call(this, id); 
};
_extend(SamplePatch, Patch, {
	
	name: "sample_patch",
	title: "Sample"
	
});
Yana.registerPatch(SamplePatch);