define(['lib/react', 'MatcherListElement', 'PermUserElement', 'ServicesListElement'], function(React, MatcherListElement, PermUserElement, ServicesListElement) {
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
		showServices: function() {
			this.setState({
				state: "services"
			})
		},
		back: function() {
			this.setState({
				state: "none"
			})
		},
		updatePerms: function() {
			disableTrading();
		},
		render: function() {
			var divStyle = {
				background: "white",
				color: "black",
//			borderRadius: "5px",
//			padding: "5px",
				paddingTop: "30px",
				position: "absolute",
				top: "0px",
				width: "300px",
				height: "200px",
				overflow: "scroll",
				zIndex: 100000
			}

			if (this.state.state == "permission") {
				var username = Object.keys(findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers)[0];
				return React.DOM.div({style: divStyle, className: "drag"},
					React.DOM.button({onClick: this.updatePerms}, "Update Perms"),
					PermUserElement({back: this.back, user: findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers[username]})
				);
			} else if (this.state.state == "services") {
				return React.DOM.div({style: divStyle, className: "drag"},
					ServicesListElement({back: this.back})
				);
			} else {
				return React.DOM.div({style: divStyle, className: "drag"},
			  	React.DOM.button({onClick: this.showPermissions}, "Permissions"),
				  React.DOM.button({onClick: this.showServices}, "Services"),
					MatcherListElement({damJS: this.props.damJS, matchers: this.state.damJS.matchers}));
			}
		}
	});
});
