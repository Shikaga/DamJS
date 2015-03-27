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
        var permissions = Object.keys(findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers[username].m_mPermissions[this.props.context].m_mPermissions[this.props.permissionGroup].m_mPermissions);
        var permissionElements = [];
        for (var i=0; i < permissions.length; i++) {
          console.log(permissions[i], findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers[username].m_mPermissions[this.props.context].m_mPermissions[this.props.permissionGroup].m_mPermissions[permissions[i]]);
          permissionElements.push(PermPermissionListElement({selectPermission: this.selectPermission, permission: permissions[i], value: findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers[username].m_mPermissions[this.props.context].m_mPermissions[this.props.permissionGroup].m_mPermissions[permissions[i]], context: this.props.context, permissionGroup: this.props.permissionGroup}));
        }

        return React.DOM.div({},
          React.DOM.button({onClick: this.props.back}, "Back"),
          permissionElements
          //PermPermissionListElement({selectContext: this.selectPermission, permission: "ALLOW"})
        );
      } else {
        return React.DOM.div();
      }
		}
	});
});
