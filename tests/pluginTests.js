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

test( "plugin has reference to DamJS", function() {
    var damJS = new DamJS(ko);
    var plugin = new DamJSPlugin(ko);
    damJS.addPlugin(plugin);

    equal(plugin.damJS, damJS);
});

test( "plugin provides data", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.data['var1'] = 'Hello';

    equal(plugin.data['var1'], 'Hello');
  });

test( "plugin disabled by default", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.subject = '/FX/EURUSD';
    equal(false, plugin.inFiltered('/FX/EURUSD'));
    equal(false, plugin.contribFiltered('/FX/EURUSD'));
});

test( "filtering disabled if forwardingHandler not enabled", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.subject = '/FX/EURUSD';
    plugin.enabled(true);
    equal(false, plugin.inFiltered('/FX/EURUSD'));
    equal(false, plugin.contribFiltered('/FX/EURUSD'));
});

test( "inFiltering enabled if forwardingHandler set", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.subject = '/FX/EURUSD';
    plugin.enabled(true);
    var spy = sinon.spy();
    plugin.setForwardingHandler(spy);

    equal(true, plugin.inFiltered('/FX/EURUSD'));
});

test( "contribFiltering enabled if contribHandler set", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.subject = '/FX/EURUSD';
    plugin.enabled(true);
    var spy = sinon.spy();
    plugin.setContribHandler(spy);

    equal(true, plugin.contribFiltered('/FX/EURUSD'));
});

test( "forwarding handler gets called on data", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.subject = '/FX/EURUSD';
    var spy = sinon.spy();
    plugin.setForwardingHandler(spy);

    plugin.onData(jp);
    equal(true, spy.calledWith(jp));
});

test( "contrib handler gets called on data", function() {
    var plugin = new DamJSPlugin(ko);
    plugin.subject = '/FX/EURUSD';
    var spy = sinon.spy();
    plugin.setContribHandler(spy);

    plugin.onContrib(jp);
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

    equal(pluginDropDown.value(), 1);
});

test( "controls are added to DamJS", function() {
    var damJS = new DamJS(ko);
    var plugin = new DamJSPlugin(ko);
    var pluginControl = new DamJSPluginController(ko);
    var pluginDropDown = new DamJSPluginDropDown(['1', '2', '3']);
    pluginControl.addDropDown(pluginDropDown);
    plugin.addControl(pluginControl)
    damJS.addPlugin(plugin);
    equal(damJS.plugins()[0].controls()[0].dropdowns()[0].value(), 1);
});
