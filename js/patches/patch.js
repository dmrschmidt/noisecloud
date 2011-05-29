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
	
	reloadStatic: function() {
		// implement if needed in subclasses for reload of static init assigns
	},
	
	updateValue: function(name, value) {
		if(value) eval('this.params.' + name + ' = ' + value + ';');
		$("#" + this.id + " input."+name).val(value);
		this.reloadStatic();
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
			controls += '<input type="text" value="'+JSON.stringify(eval('this.params.'+name))+'" class="'+name+'" /> ' + name + '<br/>'
		}
		this.element.find('.controls').first().append(controls);
	},
	
	registerEvents: function() {
		
		$(this.getElement()).find(".handle").dblclick(function(ev) {
			ev.stopPropagation();
			$(this).parent().find(".controls").show("fast");
		});
		$(this.getElement()).find(".close").click(function(ev) {
			ev.stopPropagation();
			$(this).parent().hide("fast");
		});
		$(this.getElement()).find(".controls input").keydown(function(ev) {
			if(ev.keyCode == 13) {
				$(this).blur();
				$(this).parents(".patch").find(".controls").first().hide('fast');
			}
		});
	},
	
	editableFields: function() {
		// implement in subclasses
		var fields = new Array();
		for(key in this.params)
			fields.push(key);
		return fields;
	},
	
}
