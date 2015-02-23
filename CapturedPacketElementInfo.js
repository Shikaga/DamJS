define(['lib/react'], function(React) {
	return React.createClass({
		render: function() {
			var style = {maxHeight: "1em", overflow: "hidden"}
			var capturedJP = this.props.joinPoint;
			var fields = capturedJP.target._fields;

			var fieldElements = [];
			for (var key in fields) {
				fieldElements.push(React.DOM.div({style: style}, 
					React.DOM.span(null, key + " : "),
					React.DOM.span(null, fields[key])
				));
			}
			return React.DOM.div(null, fieldElements);
		}
	});
});

