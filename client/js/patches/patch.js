var Patch = function(id, params) {
	this.id = id;
	this.element = $(
		'<div id="' + this.id + '" class="patch input" data-id="' + this.id +'">' +
		'<div class="caption">' + this.title +'</div>' +
		'<div class="handle"></div><div class="output" data-id="' + this.id +'">' +
		'</div><div class="controls" style="display:none;"><img class="close" src="/img/close.png"></div></div></div>'
	);
	this.connectedNodes = new Array();
	if(params) this.params = params;
	this.init();
};

Patch.prototype = {
	
	bufferSize: 1024,
	node: null,
	connectedNodes: null,
	
	init: function() {
		this.node = yana.audioContext.createJavaScriptNode(this.bufferSize, 1, 1);
		this.node.onaudioprocess = $.proxy(this.processAudio, this);
		
		// temporary for playing
		// this.connect(yana.audioContext.destination);
	},
	
	connect: function(nodeOrDestination) {
		this.node.connect(nodeOrDestination.node);
		nodeOrDestination.connectedNodes.push(this);
	},
	
	processAudio: function(e) {
		// implement in subclasses
	},
	
	editableFields: function() {
		// implement in subclasses
		return [];
	},
	
	updateValue: function(name) {
		var value_user = $('#'+this.id+' input.'+name).val();
		if(value_user) eval('this.' + name + ' = ' + value_user + ';'); 
	},
	
	getElement: function() {
		if(this.editableFields().length > 0 && this.element.find('.controls').text().length == 0)
			this.addControls();
		return this.element;
	},
	
	addControls: function() {
		controls = '';
		for(field in this.editableFields()) {
			var name = this.editableFields()[field];
			controls += '<input type="text" value="'+eval('this.'+name)+'" class="'+name+'" /> ' + name + '<br/>'
		}
		this.element.find('.controls').first().append(controls);
	},
	
	registerEvents: function() {
		var self = this;
		$('#' + this.id).dblclick(function() {
			$('#' + self.id).find('.controls').first().show('fast');
		});
		$('#' + this.id + ' .close').click(function() {
			$('#' + self.id).find('.controls').first().hide('fast');
		});
		$('#' + this.id + ' input').blur(function() {
			self.updateValue($(this).attr('class'));
		});
	}
	
}
