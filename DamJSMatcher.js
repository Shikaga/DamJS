define(['lib/react'], function(React) {
	function DamJSMatcher(matchString) {
		this.joinPointsCached = [];
		this.joinPointToCollectionCache = {};
		this.matchString = matchString;
		this.reacts = [];
		this.filterIncoming = false;
		this.filterOutgoing = false;
		this.injectIncoming = false;
		this.injectOutgoing = false;
		this.logIncoming = false;
		this.logOutgoing = false;;
		this.incomingInjectionFields = [{fieldValue: "", keyValue: ""}];
		this.outgoingInjectionFields = [{fieldValue: "", keyValue: ""}];
	}

	DamJSMatcher.prototype = {
		setReact: function(listener) {
			this.reacts.push(listener)
			this.updateReact();
		},
		clearReact: function(listener) {
			var listenerIndex = this.reacts.indexOf(listener);
			if (listenerIndex) {
				this.reacts.slice(listenerIndex,1);
			}
		},
		updateReact: function() {
			this.reacts.forEach(function(react) {
				if (react._lifeCycleState !== "UNMOUNTED") {
					react.setState({matches: this.joinPointsCached});
					react.setState({incomingInjectionFields: this.incomingInjectionFields});
					react.setState({outgoingInjectionFields: this.outgoingInjectionFields});
				}
			}.bind(this))
		},
		toggleIncomingFilter: function() {
			this.filterIncoming = !this.filterIncoming;
			return this.filterIncoming;
		},
		toggleOutgoingFilter: function() {
			this.filterOutgoing = !this.filterOutgoing;
			return this.filterOutgoing;
		},
		isIncomingFiltered: function() {
			return this.filterIncoming;
		},
		isOutgoingFiltered: function() {
			return this.filterOutgoing;
		},
		toggleIncomingInjection: function() {
			this.injectIncoming = !this.injectIncoming;
			return this.injectIncoming;
		},
		toggleOutgoingInjection: function() {
			this.injectOutgoing = !this.injectOutgoing;
			return this.injectOutgoing;
		},
		isIncomingInjected: function() {
			return this.injectIncoming;
		},
		isOutgoingInjected: function() {
			return this.injectOutgoing;
		},
		toggleIncomingLogging: function() {
			this.logIncoming = !this.logIncoming;
			return this.logIncoming;
		},
		toggleOutgoingLogging: function() {
			this.logOutgoing = !this.logOutgoing;
			return this.logOutgoing;
		},
		isIncomingLogged: function() {
			return this.logIncoming;
		},
		isOutgoingLogged: function() {
			return this.logOutgoing;
		},
		addIncomingInjectionField: function() {
			this.incomingInjectionFields.push({});
			this.updateReact();
		},
		addOutgoingInjectionField: function() {
			this.outgoingInjectionFields.push({});
			this.updateReact();
		},
		updateIncomingInjectionValue: function(row, value) {
			this.incomingInjectionFields[row].fieldValue = value;
			this.updateReact();
		},
		updateIncomingInjectionKey: function(row, value) {
			this.incomingInjectionFields[row].keyValue = value;
			this.updateReact();
		},
		updateOutgoingInjectionValue: function(row, value) {
			this.outgoingInjectionFields[row].fieldValue = value;
			this.updateReact();
		},
		updateOutgoingInjectionKey: function(row, value) {
			this.outgoingInjectionFields[row].keyValue = value;
			this.updateReact();
		},
		matches: function(joinPoint) {
			function isIncoming() {
				if (joinPoint && joinPoint.target) {
					return joinPoint.target.getSubject
				}

			}
			function isString() {
				return typeof joinPoint === "string";
			}
			if (isString()) {
				if (joinPoint.match(this.matchString)) {
					return true;
				}
			} else if (isIncoming()) {
				if (joinPoint && joinPoint.target && joinPoint.target.getSubject && joinPoint.target.getSubject().match(this.matchString)) {
					return true;
				}
			} else {
				if (joinPoint && joinPoint.args && joinPoint.args[0].match(this.matchString)) {
					return true;
				}
			}

			return false;
		},
		addJoinPoint: function(joinPointCollection) {
			const joinPoint = joinPointCollection[0];
			this.joinPointsCached.push(joinPoint);
			const key = this.calculateJoinPointKey(joinPoint);
			this.joinPointToCollectionCache[key] = joinPointCollection
			joinPoint.matcher = this;
			this.updateReact();
		},
		forwardJoinPoint: function(joinPoint) {
			const key = this.calculateJoinPointKey(joinPoint)
			const joinPointCollection = this.joinPointToCollectionCache[key]
			if(joinPointCollection){
				joinPointCollection.forEach(function(point){
					point.proceed();
				});
				console.log("Forwarding :", joinPoint.target.getSubject(), joinPoint.target.getFields());
			} else {
				console.log("Warning: no messages when forwarding for ", joinPoint.target.getFields());
			}
			this.removeJoinPoint(joinPoint);
		},
		removeJoinPoint: function(joinPoint) {
			var index = this.joinPointsCached.indexOf(joinPoint);
			this.joinPointsCached.splice(index,1);
			const key = this.calculateJoinPointKey(joinPoint)
			this.joinPointToCollectionCache[key] = null;
			this.updateReact();
		},
		calculateJoinPointKey: function(joinPoint) {
			return joinPoint.target._timeReceived.toString() + joinPoint.target._rttpSequenceNumber
		}
	}

	return DamJSMatcher;
});