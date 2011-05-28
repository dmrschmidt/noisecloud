var Patch = function() {
	this.params = params;
};
Patch.prototype = {
	
	getElement: function() {
		
		return $('<div class="patch"></div');
	}
	
}

var SamplePatch = function() {
	this.params = params;
};
_extend(SamplePatch, Patch, {
	
	name: "sample_patch"
	
}
Yana.registerPatch(SamplePatch);