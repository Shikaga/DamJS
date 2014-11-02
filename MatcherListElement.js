define(['lib/react', 'InjectorConfigElement', 'MatcherConfigElement', 'CapturedPacketListElement', 'SubjectAdder', 'MatcherElement'], function(React, InjectorConfigElement, MatcherConfigElement, CapturedPacketListElement, SubjectAdder, MatcherElement) {
	return React.createClass({
		getInitialState: function() {
			return {selectedMatcher: null, viewOpened: "none"}
		},
		selectMatcher: function(matcher) {
			this.setState({selectedMatcher: matcher});
		},
		setViewOpened: function(view) {
			this.setState({viewOpened: view});
		},
		render: function() {
			var style = {
				width: "1250px"
			}
			var matchersList = [];
			this.props.matchers.forEach(function(matcher) {
				matchersList.push(MatcherElement({selectMatcher: this.selectMatcher, matcher: matcher}));
			}.bind(this))

			var returnedElements = [];
			returnedElements.push(React.DOM.div({style: columnStyle},
				SubjectAdder({damJS: this.props.damJS}),
				React.DOM.div(null, matchersList)));
			if (this.state.selectedMatcher) {
				returnedElements.push(React.DOM.div({style: columnStyle},
					MatcherConfigElement({matcher: this.state.selectedMatcher, setViewOpened: this.setViewOpened})));
			}
			if (this.state.viewOpened == "inject") {
				returnedElements.push(React.DOM.div({style: columnStyle},
					InjectorConfigElement({matcher: this.state.selectedMatcher})));
			}
			if (this.state.viewOpened == "captured") {
				returnedElements.push(React.DOM.div({style: columnStyle},
					CapturedPacketListElement({matcher: this.state.selectedMatcher})));
			}

			return React.DOM.div({style: style},returnedElements);
		}
	});
});