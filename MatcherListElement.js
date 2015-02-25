define(['lib/react', 'MatcherConfigElement', 'SubjectAdder', 'MatcherElement'], function(React, MatcherConfigElement, SubjectAdder, MatcherElement) {
	return React.createClass({
		getInitialState: function() {
			return {selectedMatcher: null}
		},
		selectMatcher: function(matcher) {
			this.setState({selectedMatcher: matcher});
		},
		deselectMatcher: function() {
			this.setState({selectedMatcher: null})
		},
		render: function() {
			var style = {
				width: "1250px"
			}
			var returnedElements = [];
			if (this.state.selectedMatcher) {
				return React.DOM.div({style: columnStyle},
					MatcherConfigElement({matcher: this.state.selectedMatcher, deselectMatcher: this.deselectMatcher}));
			} else {
				var matchersList = [];
				this.props.matchers.forEach(function(matcher) {
					matchersList.push(MatcherElement({selectMatcher: this.selectMatcher, matcher: matcher}));
				}.bind(this));
				return React.DOM.div({style: columnStyle},
					SubjectAdder({damJS: this.props.damJS}),
					React.DOM.div(null, matchersList));
			}
		}
	});
});