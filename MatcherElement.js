define(['lib/react'], function(React) {
	return React.createClass({
		selectMatcher: function() {
			this.props.selectMatcher(this.props.matcher)
		},
		render: function() {
			return React.DOM.div({onClick: this.selectMatcher},this.props.matcher.matchString);
		}
	});
});