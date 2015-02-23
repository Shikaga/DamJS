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
		render: function() {
			var capturedJP = this.props.joinPoint;
			var subjectElement = React.DOM.span(null, capturedJP.target.getSubject())
			return React.DOM.div(null, subjectElement, 
				React.DOM.button(null, "Forward"), 
				React.DOM.button(null, "Remove"), 
				React.DOM.button({onClick: this.toggleInfo}, "Info"),
				this.state.infoElement);
		}
	});
});