define(['lib/react', 'DamJSMatcher', 'lib/meld'], function(React, DamJSMatcher, meld) {
	function DamJS() {
		this.matchers = [];
		this.setListeners();
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
			for (var i=0; i < this.matchers.length; i++) {
				if (this.matchers[i].matchString == matchString) {
					return;
				}
			}
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
		handleInjectIncoming: function(matcher, joinPoint) {
			matcher.incomingInjectionFields.forEach(function(injectionObj) {
				joinPoint.target._fields[injectionObj.keyValue] = injectionObj.fieldValue;
			})
		},
		handleInjectOutgoing: function(matcher, joinPoint) {
			matcher.incomingInjectionFields.forEach(function(injectionObj) {
				joinPoint.args[1][injectionObj.keyValue] = injectionObj.fieldValue;
			})
		},
		handleUpdate: function(joinPoint) {
			var proceed = true;
			this.matchers.forEach(function(matcher) {
				if (matcher.matches(joinPoint)) {
					if (matcher.injectIncoming) {
						this.handleInjectIncoming(matcher, joinPoint);
					}
					if (matcher.filterIncoming) {
						matcher.addJoinPoint(joinPoint);
						proceed = false;
					}
					if (matcher.logIncoming) {
						console.log("Incoming:", joinPoint.target.getSubject(), joinPoint.target.getFields());
					}
				}
			}.bind(this))
			if (proceed) {
				joinPoint.proceed();
			}
		},
		handlePublish: function(joinPoint) {
			this.matchers.forEach(function(matcher) {
				if (matcher.matches(joinPoint)) {
					if (matcher.injectOutgoing) {
						this.handleInjectOutgoing(matcher, joinPoint);
					}
					if (matcher.logOutgoing) {
						console.log("Outgoing:", joinPoint.args[0], joinPoint.args[1])
					}
				}
			}.bind(this));
			joinPoint.proceed();
		},
		setListeners: function() {
			if (typeof caplin !== "undefined" && typeof caplin.streamlink !== "undefined") {
				meld.around(
					caplin.streamlink.impl.subscription.SubscriptionManager.prototype, 'send', function(joinPoint) {
						joinPoint.proceed();
					}.bind(this));
//				meld.around(
//					caplin.streamlink.impl.subscription.SubscriptionManager.prototype, 'onUpdate', function(joinPoint) {
//						if (typeof x == "undefined") {
//							if (joinPoint.args[0] instanceof caplin.streamlink.impl.event.RecordType1EventImpl) {
//								x = joinPoint;
//								var subs = x.target.subscriptions.subscriptions;
//								for (var key in subs) {
//									this.addNewMatcher(subs[key].messages[0].handler._subject);
//								}
//							}
//						}
//						joinPoint.proceed();
//					}.bind(this));
				meld.around(
					caplin.streamlink.impl.StreamLinkCoreImpl.prototype, 'publishToSubject', function(joinPoint) {
						this.handlePublish(joinPoint);
					}.bind(this));
				meld.around(
					caplin.streamlink.impl.event.RecordType1EventImpl.prototype, '_publishSubscriptionResponse', function(joinPoint) {
						this.handleUpdate(joinPoint);
					}.bind(this)
				)
			}

		}
	}
	return DamJS;
});