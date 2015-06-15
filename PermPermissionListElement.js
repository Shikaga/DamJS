define(['lib/react'], function(React) {
	return React.createClass({
    getInitialState: function() {
      return {value: this.props.value == "ALLOW"}
    },
    onInputChange: function(e){
			var allowString = e.target.checked ? "ALLOW" : "DENY";
			this.props.permissions[this.props.permission] = allowString;
			this.setState({value:e.target.checked});
		},
		render: function() {
			return React.DOM.div({},
        React.DOM.div({},this.props.permission),
        React.DOM.span({}, "Allow: "),
				React.DOM.input({onChange: this.onInputChange, checked: this.state.value, type: "checkbox"})
      );
		}
	});
});
