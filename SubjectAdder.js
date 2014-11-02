define(['lib/react'], function(React) {
	return React.createClass({
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
			var style= {
				width: "140px"
			}
			return React.DOM.div(null,
				React.DOM.input({style: style, value: this.state.value, onChange: this.onInputChange}),
				React.DOM.button({onClick: this.addSubject}, "Add Subject")
			)
		}
	})
});