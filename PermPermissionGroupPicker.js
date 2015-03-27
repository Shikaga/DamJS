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

        var groups = Object.keys(findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers[username].m_mPermissions[this.props.context].m_mPermissions);
        var groupElements = [];
        for (var i=0; i < groups.length; i++) {
          groupElements.push(PermPermissionGroupPickerListElement({selectPermissionGroup: this.selectPermissionGroup, permissionGroup: groups[i]}));
        }
        return React.DOM.div({},
          React.DOM.button({onClick: this.props.back}, "Back"),
          groupElements
          //PermPermissionGroupPickerListElement({selectPermissionGroup: this.selectPermissionGroup, permissionGroup: "FX_TRADE"})
        );
      } else {
        return PermPermissionPicker({context: this.props.context, permissionGroup: this.state.permissionGroup, back: this.back});
      }
		}
	});
});
