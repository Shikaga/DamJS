define(['lib/react'], function(React) {
	return React.createClass({
    selectPermission: function() {
      this.props.selectPermission(this.props.permission);
    },
		render: function() {
			return React.DOM.div({},
        React.DOM.button({onClick: this.selectPermission},this.props.permission)
      );
		}
	});
});
