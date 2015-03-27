define(['lib/react', 'MatcherListElement', 'PermContextPicker'], function(React, MatcherListElement, PermContextPicker) {
	return React.createClass({
		getInitialState: function() {
			this.props.damJS.onUpdate(function() {
				this.setState({
					damJS: this.props.damJS,
					state: "none"
				})
			}.bind(this))
			return {
				damJS: this.props.damJS
			}
		},
		showPermissions: function() {
			this.setState({
				state: "permission"
			})
		},
		back: function() {
			this.setState({
				state: "none"
			})
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
			if (this.state.state == "permission") {
				return PermContextPicker({back: this.back});
			} else {
				return React.DOM.div({style: divStyle, className: "drag"},
			  	React.DOM.button({onClick: this.showPermissions}, "Permissions"),
					MatcherListElement({damJS: this.props.damJS, matchers: this.state.damJS.matchers}));
			}
		}
	});
});
