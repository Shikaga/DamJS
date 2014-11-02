define(['lib/react', 'MatcherButton'], function(React, MatcherButton) {
	return React.createClass({
		isFiltered: function() {
			return this.props.matcher.isOutgoingLogged();
		},
		toggleFilter: function() {
			this.props.matcher.toggleOutgoingLogging();
		},
		render: function() {
			return MatcherButton({isFiltered: this.isFiltered,toggleFilter: this.toggleFilter, buttonLabel: "Outgoing"})
		}
	});
});