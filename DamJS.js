function findPermissioningHandler() {
	for (var i in x) {
	  if (x[i].messages[0].handler.getSubject().indexOf("/PERMISSIONS/MASTER/CONTAINER") !== -1) {
			return x[i].messages[0].handler;
		}
	}
}

function disableTrading() {
	a = findPermissioningHandler();
	b = a.getSubscriptionListener();
	e1 = {getSubject: function() {return "/PERMISSIONS/MASTER/CONTROL/START"}, getFields: function() {return {TXN_ID: "999"}}, getKey: function() {return "TXN_ID"}}
	e4 = {getSubject: function() {return "/PERMISSIONS/MASTER/USER/user2@caplin.com"}, getFields: function() {return {PERMISSION_NAMESPACE: "", AUTH: "", TYPE: "ROW_COUNT", VALUE: "3"}}, getKey: function() {return "ROW_COUNT"}}
	var parents = Object.keys(findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers["user2@caplin.com"].m_mGroups).join(",");
	e2 = {getSubject: function() {return "/PERMISSIONS/MASTER/USER/user2@caplin.com"}, getFields: function() {return {PERMISSION_NAMESPACE: "", AUTH: "", TYPE: "PARENTS", VALUE: parents}}, getKey: function() {return "PARENTS"}}
	e3 = {getSubject: function() {return "/PERMISSIONS/MASTER/USER/user2@caplin.com"}, getFields: function() {return {PERMISSION_NAMESPACE: "FX_CURRENCY_PAIR_TRADE_LIST", AUTH: "USDDKK~DENY,USDJPY~DENY,EURUSD~DENY", TYPE: "PERMISSION", VALUE: ".*"}}, getKey: function() {return "PERMISSION:.*:FX_CURRENCY_PAIR_TRADE_LIST"}}

	//e5 = {getSubject: function() {return "/PERMISSIONS/MASTER/USER/user2@caplin.com"}, getFields: function() {return {AUTH: "FX-TRADE~DENY", PERMISSION_NAMESPACE: "FX_TRADE", TYPE: "PERMISSION", VALUE: ".*"}}, getKey: function() {return "PERMISSION:.*:FX_TRADE"}}
	e6 = {getSubject: function() {return "/PERMISSIONS/MASTER/CONTROL/COMMIT"}, getFields: function() {return {TXN_ID: "999"}}, getKey: function() {return "TXN_ID"}}
	b.onPermissionUpdate(a, e1);
	b.onPermissionUpdate(a, e4);
	b.onPermissionUpdate(a, e2);
	b.onPermissionUpdate(a, e3);
	//b.onPermissionUpdate(a, e5);
	b.onPermissionUpdate(a, e6);
}

function enableTrading() {
	a = findPermissioningHandler();
	b = a.getSubscriptionListener();
	e1 = {getSubject: function() {return "/PERMISSIONS/MASTER/CONTROL/START"}, getFields: function() {return {TXN_ID: "999"}}, getKey: function() {return "TXN_ID"}}
	var parents = Object.keys(findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers["user2@caplin.com"].m_mGroups).join(",");
	e2 = {getSubject: function() {return "/PERMISSIONS/MASTER/USER/user2@caplin.com"}, getFields: function() {return {PERMISSION_NAMESPACE: "", AUTH: "", TYPE: "PARENTS", VALUE: parents}}, getKey: function() {return "PARENTS"}}
	e3 = {getSubject: function() {return "/PERMISSIONS/MASTER/USER/user2@caplin.com"}, getFields: function() {return {PERMISSION_NAMESPACE: "FX_CURRENCY_PAIR_TRADE_LIST", AUTH: "USDDKK~DENY,USDJPY~DENY", TYPE: "PERMISSION", VALUE: ".*"}}, getKey: function() {return "PERMISSION:.*:FX_CURRENCY_PAIR_TRADE_LIST"}}
	e4 = {getSubject: function() {return "/PERMISSIONS/MASTER/USER/user2@caplin.com"}, getFields: function() {return {PERMISSION_NAMESPACE: "", AUTH: "", TYPE: "ROW_COUNT", VALUE: "3"}}, getKey: function() {return "ROW_COUNT"}}
	// e7 = {getSubject: function() {return "/PERMISSIONS/MASTER/USER/user2@caplin.com"}, getFields: function() {return {PERMISSION_NAMESPACE: "FX_TRADE", AUTH: "FX-TRADE~ALLOW", TYPE: "PERMISSION", VALUE: ".*"}}, getKey: function() {return "PERMISSION:.*:FX_TRADE"}}
	e6 = {getSubject: function() {return "/PERMISSIONS/MASTER/CONTROL/COMMIT"}, getFields: function() {return {TXN_ID: "999"}}, getKey: function() {return "TXN_ID"}}
	b.onPermissionUpdate(a, e1);
	b.onPermissionUpdate(a, e2);
	b.onPermissionUpdate(a, e3);
	b.onPermissionUpdate(a, e4);
	//b.onPermissionUpdate(a, e7);
	b.onPermissionUpdate(a, e6);
}

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
						x = joinPoint.args[0]._subscriptionManager.subscriptions.subscriptions;
						this.handleUpdate(joinPoint);
					}.bind(this)
				)
				meld.around(
					caplin.streamlink.impl.event.PermissionEventImpl.prototype, '_publishSubscriptionResponse', function(joinPoint) {
						x = joinPoint.args[0]._subscriptionManager.subscriptions.subscriptions;
						this.handleUpdate(joinPoint);
					}.bind(this)
				)
			}

		}
	}

	return DamJS;
});
