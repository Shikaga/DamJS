(function() {
	setTimeout(function () {
		w = window;
		d = w.document;

		var p = d.createElement('script');
		p.src= 'https://polyfill.io/v3/polyfill.js';

		p.onload = loader;

		p.onreadystatechange = function() {
			if (this.readyState === 'complete') {
				loader();
			}
		};
		d.head.appendChild(p);


	});
})();

var loader = function() {
	var s = d.createElement('script');
	s.type = 'text/javascript';
	s.src = damJSDomain + '/lib/require.js';

	if (typeof(exports) !== "undefined") {
		exportsBak = exports;
	}
	exports = undefined;

	if (typeof(define) !== "undefined") {
		defineBak = define;
	}
	define = undefined;

	if (typeof(require) !== "undefined") {
		requireBak = require;
	}
	require = undefined;


	s.onload = callBack;
	s.onreadystatechange = function() {
		if (this.readyState === 'complete') {
			callBack();
		}
	};
	d.head.appendChild(s);
};


var callBack = function() {
	require.config({
		baseUrl: damJSDomain
	});
	require(['lib/react', 'DamJSElement', 'DamJS'], function(React, DamJSElement, DamJS) {
		listStyle = {
			border: "1px solid lightgrey",
			borderRadius: "5px",
			padding: "5px",
			margin: "5px"
		};

		columnStyle = {
			width: "300px",
			height: "160px",
			padding: "20px",
			float: "left",
			backgroundColor: "white",
			overflowY: "auto"
		};

		var damJS = new DamJS(module.exports);
		damJS.addNewMatcher("/");
		damJS.addNewMatcher("/FX/EURUSD");
		damJS.addNewMatcher("/FX/GBPUSD");
		damJS.addNewMatcher("/FX/USDJPY");
		damJS.addNewMatcher("/PRIVATE");
		damJS.addNewMatcher("/PRIVATE/FX");
		damJS.addNewMatcher("/PRIVATE/TRADE/FX");
		damJS.addNewMatcher("/PRIVATE/TRADE/MM");

		var newElement = document.createElement('div');
		document.body.appendChild(newElement);
		React.renderComponent(DamJSElement({damJS: damJS}), newElement);

		try {
			exports = exportsBak;
			define = defineBak;
			require = requireBak;
		} catch (e) {
			//do nothing
		}

	});
};

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
