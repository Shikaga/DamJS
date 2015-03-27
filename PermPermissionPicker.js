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
        return React.DOM.div({},
          React.DOM.button({onClick: this.props.back}, "Back"),
          PermPermissionListElement({selectContext: this.selectPermission, permission: "ALLOW"})
        );
      } else {
        return React.DOM.div();
      }
		}
	});
});
