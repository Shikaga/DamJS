define(['lib/react'], function(React) {
	return React.createClass({
    setServiceUp: function(service) {
      return function() {
        var e = new caplin.streamlink.impl.event.ServiceStatusEventImpl('OK', service)
        var b = CTSL.getSLJS()._streamLinkCore._protocolHandler.connection.connectionListeners[3];
        debugger;
        b.onServiceStatusChange(e);
      }
    },
    setServiceDown: function(service) {
      return function() {
        var e = new caplin.streamlink.impl.event.ServiceStatusEventImpl('DOWN', service)
        var b = CTSL.getSLJS()._streamLinkCore._protocolHandler.connection.connectionListeners[3];
        debugger;
        b.onServiceStatusChange(e);
      }
    },

		render: function() {
      var serviceElements = []
      var services = CTSL.getSLJS()._streamLinkCore._protocolHandler.connection.connectionListeners[3]._services;
      if (services) {
        for (var service in services) {
          serviceElements.push(React.DOM.div({},
            React.DOM.span({}, service),
            React.DOM.button({onClick: this.setServiceUp(service)}, "Up"),
            React.DOM.button({onClick: this.setServiceDown(service)}, "Down")
          ))
        }
      }

			return React.DOM.div({},
        React.DOM.button({onClick: this.props.back}, "Back"),
        serviceElements);
		}
	});
});
