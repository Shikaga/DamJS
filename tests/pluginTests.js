function MockJoinPoint() {
    this.args = [];
    this.proceed = sinon.stub().returns('test');
    this.target = null;
}

module("Plugin Tests", {
    setup: function() {
        jp = new MockJoinPoint();
    }
})

test( "plugin can't handle subject by default", function() {
    var plugin = new DamJSPlugin(ko);
    equal(false, plugin.inFiltered('/FX/EURUSD'));
});

test( "plugin can handle specific subject", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.subject = '/FX/EURUSD';
    equal(true, plugin.inFiltered('/FX/EURUSD'));
});

test( "forwarding handler gets called on data", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.subject = '/FX/EURUSD';
    var spy = sinon.spy();
    plugin.setForwardingHandler(spy);

    plugin.onData(jp);
    equal(true, spy.calledWith(jp));
});

test( "plugin controls support dropdowns", function() {
    var pluginControl = new DamJSPluginController(ko);
    var pluginDropDown = new DamJSPluginDropDown(['1', '2', '3']);
    pluginControl.addDropDown(pluginDropDown);
    equal(pluginControl.dropdowns()[0], pluginDropDown);
});

test( "dropdown defaults to first value", function() {
    var pluginControl = new DamJSPluginController(ko);
    var pluginDropDown = new DamJSPluginDropDown(['1', '2', '3']);
    pluginControl.addDropDown(pluginDropDown);

    equal(pluginDropDown.value, 1);
});

test( "controls are added to DamJS", function() {
    var damJS = new DamJS(ko);
    var plugin = new DamJSPlugin(ko);
    var pluginControl = new DamJSPluginController(ko);
    var pluginDropDown = new DamJSPluginDropDown(['1', '2', '3']);
    pluginControl.addDropDown(pluginDropDown);
    plugin.addControl(pluginControl)
    damJS.addPlugin(plugin);

    equal(damJS.plugins()[0].controls()[0].dropdowns()[0].value, 1);
});


