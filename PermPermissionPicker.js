define(['lib/react', 'PermPermissionListElement'], function(React, PermPermissionListElement) {
	return React.createClass({
    getInitialState: function() {
      return {
        permission: null
      }
    },
		selectPermission: function(permission) {
			this.setState({
        permission: permission
      });
		},
		render: function() {
      if (this.state.permission == null) {

        permissionElements = [];
        var permissions = Object.keys(this.props.permissions);
        var permissionElements = [];
        for (var i=0; i < permissions.length; i++) {
          permissionElements.push(PermPermissionListElement({selectPermission: this.selectPermission, permission: permissions[i], value: this.props.permissions[permissions[i]], context: this.props.context, permissionGroup: this.props.permissionGroup}));
        }

        return React.DOM.div({},
          React.DOM.button({onClick: this.props.back}, "Back"),
          permissionElements
        );
      } else {
        return React.DOM.div();
      }
		}
	});
});
