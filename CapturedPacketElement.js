define(['lib/react', 'CapturedPacketElementInfo'], function(React, CapturedPacketElementInfo) {
	return React.createClass({
		getInitialState: function() {
			return {
				infoShown: false,
				infoElement: React.DOM.div(null)
			}
		},
		toggleInfo: function() {
			if (this.state.infoShown) {
				this.setState({
					infoElement: React.DOM.div(null), 
					infoShown: false
				});
			} else {
				this.setState({
					infoElement: CapturedPacketElementInfo({joinPoint: this.props.joinPoint}), 
					infoShown: true
				});
			}
		},
		forwardJoinPoint: function() {
			this.props.joinPoint.matcher.forwardJoinPoint(this.props.joinPoint);
		},
		removeJoinPoint: function() {
			this.props.joinPoint.matcher.removeJoinPoint(this.props.joinPoint);
		},
		render: function() {
			var capturedJP = this.props.joinPoint;
			var subjectElement = React.DOM.span(null, capturedJP.target.getSubject())
			return React.DOM.div(null, subjectElement, 
				React.DOM.button({onClick: this.forwardJoinPoint}, "Forward"), 
				React.DOM.button({onClick: this.removeJoinPoint}, "Remove"), 
				React.DOM.button({onClick: this.toggleInfo}, "Info"),
				this.state.infoElement);
		}
	});
});