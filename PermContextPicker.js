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
        return React.DOM.div({},
          React.DOM.button({onClick: this.props.back}, "Back"),
          PermContextPickerListElement({selectContext: this.selectContext, context: ".*"})
        );
      } else {
        return PermPermissionGroupPicker({back: this.back})
      }

		}
	});
});
