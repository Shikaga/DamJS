define(['lib/react', 'PermContextPickerListElement', 'PermPermissionGroupPicker'], function(React, PermContextPickerListElement, PermPermissionGroupPicker) {
	return React.createClass({
    getInitialState: function() {
      return {
        context: null
      }
    },
		selectContext: function(context) {
			this.setState({
        context: context
      });
		},
    back: function() {
      this.setState({
        context: null
      });
    },
		render: function() {
      if (this.state.context == null) {

        var contexts = Object.keys(findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers[username].m_mPermissions);
        var contextElements = [];
        for (var i=0; i < contexts.length; i++) {
          contextElements.push(PermContextPickerListElement({selectContext: this.selectContext, context: contexts[i]}));
        }

        return React.DOM.div({},
          React.DOM.button({onClick: this.props.back}, "Back"),
          contextElements
        );
      } else {
        return PermPermissionGroupPicker({back: this.back, context: this.state.context})
      }

		}
	});
});
