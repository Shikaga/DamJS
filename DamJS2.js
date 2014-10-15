var listStyle = {
	border: "1px solid lightgrey",
	borderRadius: "5px",
	padding: "5px",
	margin: "5px"
}

var DamJSElement = React.createClass({
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
			borderRadius: "5px",
			padding: "5px",
			paddingTop: "30px",
			position: "relative",
			width: "300px",
			zIndex: 100000
		}
		return React.DOM.div({style: divStyle, className: "drag"},
			SubjectAdder({damJS: this.props.damJS}),
			MatcherListElement({matchers: this.state.damJS.matchers}));
	}
})

var SubjectAdder = React.createClass({
	getInitialState: function() {
		return {value: ""}
	},
	addSubject: function() {
		this.props.damJS.addNewMatcher(this.state.value);
	},
	onInputChange: function(e){
		this.setState({value:e.target.value});
	},
	render: function() {
		return React.DOM.div(null,
			React.DOM.input({value: this.state.value, onChange: this.onInputChange}),
			React.DOM.button({onClick: this.addSubject}, "Add Subject")
		)
	}
})

var MatcherListElement = React.createClass({
	getInitialState: function() {
		return {selectedMatcher: null}
	},
	selectMatcher: function(matcher) {
		this.setState({selectedMatcher: matcher});
	},
	render: function() {
		var matchersList = [];
		this.props.matchers.forEach(function(matcher) {
			matchersList.push(MatcherElement({selectMatcher: this.selectMatcher, matcher: matcher}));
		}.bind(this))

		return React.DOM.div(null,
			React.DOM.div({style: listStyle}, matchersList),
			MatcherConfigElement({matcher: this.state.selectedMatcher}),
			CapturedPacketListElement({matcher: this.state.selectedMatcher})
		);
  }
});

var MatcherFilterButton = React.createClass({
	getInitialState: function() {
		return {
			style: {backgroundColor: "green"},
			openOrFiltered: "Open"
		}
	},
	toggleFilter: function() {
		this.props.toggleFilter();
		this.setFiltered()
	},
	setFiltered: function() {
		if (this.props.isFiltered())  {
			this.setState({
				style: {backgroundColor: "red"},
				openOrFiltered: "Filtered"
			});
		} else {
			this.setState({
				style: {backgroundColor: "green"},
				openOrFiltered: "Open"
			});
		}

	},
	render: function() {
		return React.DOM.button({onClick: this.toggleFilter, style: this.state.style}, this.props.buttonLabel + " " + this.state.openOrFiltered);
	}
})

var MatcherFilterIncomingButton = React.createClass({
	isFiltered: function() {
		return this.props.matcher.isIncomingFiltered();
	},
	toggleFilter: function() {
		this.props.matcher.toggleIncoming();
	},
	render: function() {
		return MatcherFilterButton({isFiltered: this.isFiltered,toggleFilter: this.toggleFilter, buttonLabel: "Incoming"})
	}
})

var MatcherFilterOutgoingButton = React.createClass({
	isFiltered: function() {
		return this.props.matcher.isOutgoingFiltered();
	},
	toggleFilter: function() {
		this.props.matcher.toggleOutgoing();
	},
	render: function() {
		return MatcherFilterButton({isFiltered: this.isFiltered,toggleFilter: this.toggleFilter, buttonLabel: "Outgoing"})
	}
})

var MatcherConfigElement = React.createClass({
	render: function() {
		if (this.props.matcher) {
			return React.DOM.div(null,
				MatcherFilterIncomingButton({matcher: this.props.matcher}),
				MatcherFilterOutgoingButton({matcher: this.props.matcher})
			);
		} else {
			return React.DOM.div();
		}
	}
})

var MatcherElement = React.createClass({
	selectMatcher: function() {
		this.props.selectMatcher(this.props.matcher)
	},
  render: function() {
		return React.DOM.div({onClick: this.selectMatcher},this.props.matcher.matchString);
  }
});

var CapturedPacketListElement = React.createClass({
	getInitialState: function() {
		return {
			matches: []
		}
	},
	componentWillReceiveProps: function(props) {
		if (this.props.matcher) {
			this.props.matcher.clearReact();
		}
		if (props.matcher) {
			props.matcher.setReact(this);
		}
	},
	render: function() {
		var packetList = [];
		if (this.state.matches) {
			this.state.matches.forEach(function(joinPoint) {
				packetList.push(CapturedPacketElement({joinPoint: joinPoint}));
			})
		}
		return React.DOM.div({style: listStyle}, packetList);
	}
});

var CapturedPacketElement = React.createClass({
	render: function() {
		return React.DOM.div(null,this.props.joinPoint.target.getSubject());
	}
});

function DamJSMatcher(matchString) {
	this.joinPointsCached = [];
	this.matchString = matchString;
	this.react = null;
	this.filterIncoming = false;
	this.filterOutgoing = false;
}

DamJSMatcher.prototype = {
	setReact: function(react) {
		this.react = react;
		this.updateReact();
	},
	clearReact: function() {
		this.react = null;
	},
	updateReact: function() {
		if (this.react) {
			this.react.setState({matches: this.joinPointsCached});
		}
	},
	toggleOutgoing: function() {
		this.filterOutgoing = !this.filterOutgoing;
		return this.filterOutgoing;
	},
	toggleIncoming: function() {
		this.filterIncoming = !this.filterIncoming;
		return this.filterIncoming;
	},
	isOutgoingFiltered: function() {
		return this.filterOutgoing;
	},
	isIncomingFiltered: function() {
		return this.filterIncoming;
	},
	matches: function(joinPoint) {
		if (joinPoint.target.getSubject().match(this.matchString)) {
			return true;
		}
		return false;
	},
	addJoinPoint: function(joinPoint) {
		this.joinPointsCached.push(joinPoint);
		this.updateReact();
	}
}

function DamJS(meld) {
	this.matchers = [];
	this.setListeners(meld);
	this.react = null;
}

DamJS.prototype = {
	setReact: function(react) {
		this.react = react;
		this.updateReact();
	},
	clearReact: function() {
		this.react = null;
	},
	updateReact: function() {

	},
	addNewMatcher: function(matchString) {
		this.matchers.push(new DamJSMatcher(matchString));
		this.update();
	},
	update: function() {
		if (this.listener) {
			this.listener();
		}
	},
	onUpdate: function(fn) {
		this.listener = fn;
	},
	setListeners: function(meld) {
		if (typeof caplin !== "undefined" && typeof caplin.streamlink !== "undefined") {
			meld.around(
				caplin.streamlink.impl.subscription.SubscriptionManager.prototype, 'send', function(joinPoint) {
					joinPoint.proceed();
				}.bind(this));

			meld.around(
				caplin.streamlink.impl.StreamLinkCoreImpl.prototype, 'publishToSubject', function(joinPoint) {
					//debugger;
				}.bind(this));

			meld.around(
				caplin.streamlink.impl.event.RecordType1EventImpl.prototype, '_publishSubscriptionResponse', function(joinPoint) {
					//debugger;
					this.matchers.forEach(function(matcher) {
						if (matcher.matches(joinPoint)) {
							matcher.addJoinPoint(joinPoint);
						}
					}.bind(this))
					joinPoint.proceed();
				}.bind(this)
			)
		}

	}
}

var damJS = new DamJS(module.exports);
damJS.addNewMatcher("/FX/EURUSD");
damJS.addNewMatcher("/FX/GBPUSD");
damJS.addNewMatcher("/FX/USDJPY");

var newElement = document.createElement('div');
document.body.appendChild(newElement);
React.renderComponent(DamJSElement({damJS: damJS}), newElement);