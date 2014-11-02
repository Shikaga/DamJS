define(['lib/react', 'MatcherListElement'], function(React, MatcherListElement) {
	return React.createClass({
		getInitialState: function() {
			this.props.damJS.onUpdate(function() {
				this.setState({
					damJS: this.props.damJS
				})
			}.bind(this))
			return {
				damJS: this.props.damJS
			}
		},
		render: function() {
			var divStyle = {
				background: "white",
				color: "black",
//			borderRadius: "5px",
//			padding: "5px",
				paddingTop: "30px",
				position: "relative",
				width: "300px",
				height: "200px",
				zIndex: 100000
			}
			return React.DOM.div({style: divStyle, className: "drag"},
				MatcherListElement({matchers: this.state.damJS.matchers}));
		}
	});
});

