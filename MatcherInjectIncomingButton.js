define(['lib/react', 'MatcherButton'], function(React, MatcherButton) {
	return React.createClass({
		isFiltered: function() {
			return this.props.matcher.isIncomingInjected();
		},
		toggleFilter: function() {
			this.props.matcher.toggleIncomingInjection();
		},
		render: function() {
			return MatcherButton({isFiltered: this.isFiltered,toggleFilter: this.toggleFilter, buttonLabel: "Incoming"})
		}
	});
});