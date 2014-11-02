define(['lib/react', 'MatcherFilterOutgoingButton', 'MatcherInjectOutgoingButton', 'MatcherLoggerOutgoingButton', 'MatcherFilterIncomingButton', 'MatcherInjectIncomingButton', 'MatcherLoggerIncomingButton'], function(React, MatcherFilterOutgoingButton, MatcherInjectOutgoingButton, MatcherLoggerOutgoingButton, MatcherFilterIncomingButton, MatcherInjectIncomingButton, MatcherLoggerIncomingButton) {
	return React.createClass({
		render: function() {
			var textStyle = {display: "inline-block", minWidth: "40px"};
			var buttonStyle = {backgroundColor: "lightgrey"};
			if (this.props.matcher) {
				return React.DOM.div(null,
					React.DOM.div(null, this.props.matcher.matchString),
					React.DOM.div(null,
						React.DOM.span({style: textStyle},"Filter"), MatcherFilterIncomingButton({matcher: this.props.matcher}),
						MatcherFilterOutgoingButton({matcher: this.props.matcher}),
						React.DOM.button({style: buttonStyle, onClick: function() {this.props.setViewOpened("captured")}.bind(this)}, "View")
					),
					React.DOM.div(null,
						React.DOM.span({style: textStyle},"Inject"), MatcherInjectIncomingButton({matcher: this.props.matcher}),
						MatcherInjectOutgoingButton({matcher: this.props.matcher}),
						React.DOM.button({style: buttonStyle, onClick: function() {this.props.setViewOpened("inject")}.bind(this)}, "Conf")
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