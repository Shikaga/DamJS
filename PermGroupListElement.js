define(['lib/react'], function(React) {
	return React.createClass({
    selectGroup: function() {
      this.props.selectGroup(this.props.group);
    },
		render: function() {
			return React.DOM.div({},
        React.DOM.button({onClick: this.selectGroup},this.props.group)
      );
		}
	});
});
