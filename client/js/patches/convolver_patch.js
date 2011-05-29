function ImpulseResponse(url, index) {
	this.url = url;
	this.index = index;
	this.startedLoading = false;
	this.loaded = false;
	this.buffer = 0;
}

ImpulseResponse.prototype.load = function(preset) {
	if (this.loaded) {
			// Already loaded
			// preset.assetFinishedLoading(this);
			return;
	}
		
	if (this.startedLoading) {
			return;
	}
	this.startedLoading = true;
			
	// Load asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", this.url, true);
	request.responseType = "arraybuffer";
	this.request = request;
	
	var asset = this;
	
	request.onload = function() {
			// asset.buffer = request.buffer;
			asset.buffer = yana.audioContext.createBuffer(request.response, false);
			asset.loaded = true;
			
			// Tell the patch that we're ready
			ConvolverPatch.impulseResponseLoaded(asset);
	}
	
	request.send();
}

var ConvolverPatch = function(params) {
	ConvolverPatch.superclass.constructor.call(this, params);
};

ConvolverPatch.impulseResponses = [
	"/audio/impulse_responses/spatialized5.wav",
	"/audio/impulse_responses/cosmic-ping-long.wav",
	"/audio/impulse_responses/filter-telephone.wav",
	"/audio/impulse_responses/comb-saw2.wav",
	"/audio/impulse_responses/filter-rhythm1.wav",
	"/audio/impulse_responses/filter-rhythm3.wav"
],
ConvolverPatch.impulseResponseList = [],
ConvolverPatch._loaded = false;

ConvolverPatch.impulseResponseLoaded = function(impulseResponse) {
	ConvolverPatch.impulseResponseList.push(impulseResponse);
	if(ConvolverPatch.impulseResponseList.length == ConvolverPatch.impulseResponses.length) {
		ConvolverPatch._loaded = true;
	}
};

ConvolverPatch.loaded = function() {
	return ConvolverPatch._loaded;
}

ConvolverPatch.loadImpulseResponses = function() {
	if(ConvolverPatch._loaded) return;
	for (i = 0; i < ConvolverPatch.impulseResponses.length; i++) {
		new ImpulseResponse(ConvolverPatch.impulseResponses[i], i).load();
	}
}

// start loading the ImpulseResponses
ConvolverPatch.loadImpulseResponses();

_extend(ConvolverPatch, Patch, {
	
	name: "convolver_patch",
	title: "Convolver",
	
	init: function() {
		this.node = yana.audioContext.createConvolver();
		// alert(ConvolverPatch.loaded() ? 'ja' : 'nein');
		this.node.buffer = ConvolverPatch.impulseResponseList[5].buffer;
		// while(!ConvolverPatch.loaded()) {}
		// alert('loaded');
	},
	
});
Yana.registerPatch(ConvolverPatch);
