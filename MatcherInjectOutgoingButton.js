define(['lib/react', 'MatcherButton'], function(React, MatcherButton) {
	return React.createClass({
		isFiltered: function() {
			return this.props.matcher.isOutgoingInjected();
		},
		toggleFilter: function() {
			this.props.matcher.toggleOutgoingInjection();
		},
		render: function() {
			return MatcherButton({isFiltered: this.isFiltered,toggleFilter: this.toggleFilter, buttonLabel: "Outgoing"})
		}
	});
});