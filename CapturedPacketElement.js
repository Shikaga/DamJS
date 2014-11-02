define(['lib/react'], function(React) {
	return React.createClass({
		render: function() {
			return React.DOM.div(null,this.props.joinPoint.target.getSubject());
		}
	});
});