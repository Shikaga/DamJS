define(['lib/react'], function(React) {
	return React.createClass({
    getInitialState: function() {
      return {value: this.props.value}
    },
    onInputChange: function(e){
			this.props.permissions[this.props.permission] = e.target.value;
			this.setState({value:e.target.value});
		},
		render: function() {
			return React.DOM.div({},
        React.DOM.div({},this.props.permission),
        React.DOM.input({onChange: this.onInputChange, value: this.state.value})
      );
		}
	});
});
