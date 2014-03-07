function DamJSPlugin(ko) {
    this.ko = ko;
    this.name = this.ko.observable('UNNAMED');
    this.subject = null;
    this.data = {};
    this.forwardingHandler = null
    this.contribHandler = null
    this.controls = this.ko.observableArray();
    this.damJS = null;
    this.enabled = this.ko.observable(false);
}

DamJSPlugin.prototype.addControl = function(control) {
    this.controls.push(control);
}

DamJSPlugin.prototype.inFiltered = function(subject) {
    return (this.subject === subject) &&
      this.enabled() &&
      this.forwardingHandler !== null;
}

DamJSPlugin.prototype.contribFiltered = function(subject) {
    return (this.subject === subject) &&
      this.enabled() &&
      this.contribHandler !== null;
}

DamJSPlugin.prototype.setForwardingHandler = function(forwardingHandler) {
    this.forwardingHandler = forwardingHandler;
}

DamJSPlugin.prototype.setContribHandler = function(contribHandler) {
    this.contribHandler = contribHandler;
}

DamJSPlugin.prototype.onData = function(joinPoint) {
    this.forwardingHandler(joinPoint);
}

DamJSPlugin.prototype.onContrib = function(joinPoint) {
    this.contribHandler(joinPoint);
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
