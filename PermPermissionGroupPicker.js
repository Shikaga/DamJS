define(['lib/react', 'PermPermissionGroupPickerListElement', 'PermPermissionPicker'], function(React, PermPermissionGroupPickerListElement, PermPermissionPicker) {
	return React.createClass({
    getInitialState: function() {
      return {
        permissionGroup: null
      }
    },
		selectPermissionGroup: function(permissionGroup) {
			this.setState({
        permissionGroup: permissionGroup
      });
		},
    back: function() {
      this.setState({
        permissionGroup: null
      });
    },
		render: function() {
      if (this.state.permissionGroup == null) {
        return React.DOM.div({},
          React.DOM.button({onClick: this.props.back}, "Back"),
          PermPermissionGroupPickerListElement({selectPermissionGroup: this.selectPermissionGroup, permissionGroup: "FX_TRADE"})
        );
      } else {
        return PermPermissionPicker({back: this.back});
      }
		}
	});
});
