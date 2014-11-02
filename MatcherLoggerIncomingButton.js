define(['lib/react', 'MatcherButton'], function(React, MatcherButton) {
	return React.createClass({
		isFiltered: function() {
			return this.props.matcher.isIncomingLogged();
		},
		toggleFilter: function() {
			this.props.matcher.toggleIncomingLogging();
		},
		render: function() {
			return MatcherButton({isFiltered: this.isFiltered,toggleFilter: this.toggleFilter, buttonLabel: "Incoming"})
		}
	});
});