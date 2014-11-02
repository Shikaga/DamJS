//(function() {
//	setTimeout(function () {
//		w = window;
//		d = w.document;
//		var s = d.createElement('script');
//		s.src = 'http://localhost:8080/lib/react.js';
//		s.onload = function() {
//			var s = d.createElement('script');
//			s.src = 'http://localhost:8080/meld.js';
//			s.onload = function() {
//				var s = d.createElement('script');
//				s.src = 'http://localhost:8080/DamJS2.js';
//				s.onload = function() {
//				};
//				d.head.appendChild(s);
//			};
//			d.head.appendChild(s);
//		}
//		d.head.appendChild(s);
//	});
//})();

(function() {
	setTimeout(function () {
		w = window;
		d = w.document;
		var s = d.createElement('script');
		s.src = 'http://localhost:8080/lib/require.js';
		s.onload = function() {
			require(['lib/react', 'Example'], function(React, Example) {

				function DamJSMatcher(matchString) {
					this.joinPointsCached = [];
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
							return joinPoint.target.getSubject
						}
						if (isIncoming()) {
							if (joinPoint.target.getSubject().match(this.matchString)) {
								return true;
							}
						} else {
							if (joinPoint.args[0].match(this.matchString)) {
								return true;
							}
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
						this.matchers.forEach(function(matcher) {
							if (matcher.matches(joinPoint)) {
								if (matcher.injectIncoming) {
									this.handleInjectIncoming(matcher, joinPoint);
								}
								if (matcher.filterIncoming) {
									matcher.addJoinPoint(joinPoint);
								}
								if (matcher.logIncoming) {
									console.log("Incoming:", joinPoint.target.getSubject(), joinPoint.target.getFields());
								}
							}
						}.bind(this))
						joinPoint.proceed();
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
					setListeners: function(meld) {
						if (typeof caplin !== "undefined" && typeof caplin.streamlink !== "undefined") {
							meld.around(
								caplin.streamlink.impl.subscription.SubscriptionManager.prototype, 'send', function(joinPoint) {
									joinPoint.proceed();
								}.bind(this));

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

				var damJS = new DamJS(module.exports);
				damJS.addNewMatcher("/FX/EURUSD");
				damJS.addNewMatcher("/FX/GBPUSD");
				damJS.addNewMatcher("/FX/USDJPY");
				damJS.addNewMatcher("/PRIVATE/TRADE/FX");

				var newElement = document.createElement('div');
				document.body.appendChild(newElement);
				React.renderComponent(Example({damJS: damJS}), newElement);
			});
		}
		d.head.appendChild(s);
	});
})();

module = {exports: null};


//DRAG AND DROP -- http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx 

var _startX = 0;            // mouse starting positions
var _startY = 0;
var _offsetX = 0;           // current element offset
var _offsetY = 0;
var _dragElement;           // needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0;         // we temporarily increase the z-index during drag

function OnMouseDown(e)
{
    // IE is retarded and doesn't pass the event object
    if (e == null) 
        e = window.event; 
    
    // IE uses srcElement, others use target
    var target = e.target != null ? e.target : e.srcElement;

    // for IE, left click == 1
    // for Firefox, left click == 0
    if ((e.button == 1 && window.event != null || 
        e.button == 0) && 
        target.className == 'drag')
    {
        // grab the mouse position
        _startX = e.clientX;
        _startY = e.clientY;
        
        // grab the clicked element's position
        _offsetX = ExtractNumber(target.style.left);
        _offsetY = ExtractNumber(target.style.top);
        
        // bring the clicked element to the front while it is being dragged
        _oldZIndex = target.style.zIndex;
        target.style.zIndex = 10000;
        
        // we need to access the element in OnMouseMove
        _dragElement = target;

        // tell our code to start moving the element with the mouse
        document.onmousemove = OnMouseMove;
        
        // cancel out any text selections
        document.body.focus();

        // prevent text selection in IE
        document.onselectstart = function () { return false; };
        // prevent IE from trying to drag an image
        target.ondragstart = function() { return false; };
        
        // prevent text selection (except IE)
        return false;
    }
}

function OnMouseMove(e)
{
    if (e == null) 
        var e = window.event; 

    // this is the actual "drag code"
    _dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
    _dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
}

function OnMouseUp(e)
{
    if (_dragElement != null)
    {
        _dragElement.style.zIndex = _oldZIndex;

        // we're done with these events until the next OnMouseDown
        document.onmousemove = null;
        document.onselectstart = null;
        _dragElement.ondragstart = null;

        // this is how we know we're not dragging      
        _dragElement = null;
    }
}

function ExtractNumber(value)
{
    var n = parseInt(value);
    
    return n == null || isNaN(n) ? 0 : n;
}

function InitDragDrop()
{
    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;
}

InitDragDrop();