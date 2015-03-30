define(['lib/react', 'PermGroupListElement', 'PermContextPicker'], function(React, PermGroupListElement, PermContextPicker) {
	return React.createClass({
    getInitialState: function() {
      return {
        group: null,
        permSelected: false
      }
    },
		selectGroup: function(group) {
			this.setState({
        group: group
      });
		},
    back: function() {
      this.setState({
        group: null,
        permSelected: false
      });
    },
    selectPerms: function() {
      this.setState({
        permSelected: true
      })
    },
		render: function() {
      if (this.state.permSelected == true) {
        return PermContextPicker({back: this.back, contexts: this.props.user.m_mPermissions})
      } else if (this.state.group == null) {
        groupElements = [];
        var groups = Object.keys(this.props.user.m_mGroups);
        var permissionElements = [];
        for (var i=0; i < groups.length; i++) {
          groupElements.push(PermGroupListElement({selectGroup: this.selectGroup, group: groups[i]}));
        }

        return React.DOM.div({},
          React.DOM.div({}, React.DOM.button({onClick: this.props.back}, "Back")),
          React.DOM.div({}, React.DOM.button({onClick: this.selectPerms}, "Permissions")),
          React.DOM.div({}, "Groups"),
          groupElements
        );
      } else {
        return PermContextPicker({back: this.back, contexts: this.props.user.m_mGroups[this.state.group].m_mPermissions})
      }

		}
	});
});
