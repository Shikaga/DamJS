function DamJSPlugin(ko) {
    this.ko = ko;
    this.subject = null;
    this.data = {};
    this.forwardingHandler = null
    this.controls = this.ko.observableArray();
    this.damJS = null;
}

DamJSPlugin.prototype.addControl = function(control) {
    this.controls.push(control);
}

DamJSPlugin.prototype.inFiltered = function(subject) {
    return this.subject === subject;
}

DamJSPlugin.prototype.setForwardingHandler = function(forwardingHandler) {
    this.forwardingHandler = forwardingHandler;
}

DamJSPlugin.prototype.onData = function(joinPoint) {
    this.forwardingHandler(joinPoint);
}

function DamJSPluginController(ko) {
    this.dropdowns = ko.observableArray();
    this.value = null;
}

DamJSPluginController.prototype.addDropDown = function(dropdown) {
    this.dropdowns.push(dropdown);
}

function DamJSPluginDropDown(options) {
    this.options = options;
    this.value = ko.observable(options[0]);
}