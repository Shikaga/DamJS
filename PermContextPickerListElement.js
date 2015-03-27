define(['lib/react'], function(React) {
	return React.createClass({
    selectContext: function() {
      this.props.selectContext(this.props.context);
    },
		render: function() {
			return React.DOM.div({},
        React.DOM.button({onClick: this.selectContext},this.props.context)
      );
		}
	});
});
