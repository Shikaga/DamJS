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

        var groups = Object.keys(this.props.contextPermissions);
        var groupElements = [];
        for (var i=0; i < groups.length; i++) {
          groupElements.push(PermPermissionGroupPickerListElement({selectPermissionGroup: this.selectPermissionGroup, permissionGroup: groups[i]}));
        }
        return React.DOM.div({},
          React.DOM.button({onClick: this.props.back}, "Back"),
          groupElements
        );
      } else {
        return PermPermissionPicker({context: this.props.context, permissions: this.props.contextPermissions[this.state.permissionGroup].m_mPermissions, permissionGroup: this.state.permissionGroup, back: this.back});
      }
		}
	});
});
