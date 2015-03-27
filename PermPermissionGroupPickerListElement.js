define(['lib/react'], function(React) {
	return React.createClass({
    selectPermissionGroup: function() {
      this.props.selectPermissionGroup(this.props.permissionGroup);
    },
		render: function() {
			return React.DOM.div({},
        React.DOM.button({onClick: this.selectPermissionGroup},this.props.permissionGroup)
      );
		}
	});
});
