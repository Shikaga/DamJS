define(['lib/react', 'MatcherFilterOutgoingButton', 'MatcherInjectOutgoingButton', 'MatcherLoggerOutgoingButton', 'MatcherFilterIncomingButton', 'MatcherInjectIncomingButton', 'MatcherLoggerIncomingButton', 'InjectorConfigElement', 'CapturedPacketListElement'], function(React, MatcherFilterOutgoingButton, MatcherInjectOutgoingButton, MatcherLoggerOutgoingButton, MatcherFilterIncomingButton, MatcherInjectIncomingButton, MatcherLoggerIncomingButton, InjectorConfigElement, CapturedPacketListElement) {
	return React.createClass({
		getInitialState: function() {
			return {state: "none"}
		},
		back: function() {
			this.setState({state: "none"});
		},
		inject: function() {
			this.setState({state: "inject"});
		},
		captured: function() {
			this.setState({state: "captured"});
		},
		render: function() {
			var textStyle = {display: "inline-block", minWidth: "40px"};
			var buttonStyle = {backgroundColor: "lightgrey"};


			if (this.state.state == "captured") {
				return React.DOM.div({style: columnStyle},
					CapturedPacketListElement({matcher: this.props.matcher, back: this.back}));
			} else if (this.state.state == "inject") {
				return React.DOM.div({style: columnStyle},
					InjectorConfigElement({matcher: this.props.matcher, back: this.back}));
			} else if (this.props.matcher) {
				return React.DOM.div(null,
					React.DOM.button({onClick: function() {this.props.deselectMatcher()}.bind(this)}, "Back"),
					React.DOM.div(null, this.props.matcher.matchString),
					React.DOM.div(null,
						React.DOM.span({style: textStyle},"Filter"), MatcherFilterIncomingButton({matcher: this.props.matcher}),
						MatcherFilterOutgoingButton({matcher: this.props.matcher}),
						React.DOM.button({style: buttonStyle, onClick: this.captured}, "View")
					),
					React.DOM.div(null,
						React.DOM.span({style: textStyle},"Inject"), MatcherInjectIncomingButton({matcher: this.props.matcher}),
						MatcherInjectOutgoingButton({matcher: this.props.matcher}),
						React.DOM.button({style: buttonStyle, onClick: this.inject}, "Conf")
					),
					React.DOM.div(null,
						React.DOM.span({style: textStyle},"Log"), MatcherLoggerIncomingButton({matcher: this.props.matcher}),
						MatcherLoggerOutgoingButton({matcher: this.props.matcher})
					)
				);
			} else {
				return React.DOM.div();
			}
		}
	})
});