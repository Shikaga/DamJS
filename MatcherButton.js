define(['lib/react'], function(React) {
	return React.createClass({
		getInitialState: function() {
			return {
				style: {backgroundColor: "lightgrey"},
				openOrFiltered: "Off"
			}
		},
		componentWillReceiveProps: function(props) {
			this.setFiltered();
		},
		toggleFilter: function() {
			this.props.toggleFilter();
			this.setFiltered()
		},
		setFiltered: function() {
			if (this.props.isFiltered())  {
				this.setState({
					style: {backgroundColor: "lightgreen"},
					openOrFiltered: "On"
				});
			} else {
				this.setState({
					style: {backgroundColor: "lightgrey"},
					openOrFiltered: "Off"
				});
			}
		},
		render: function() {
			return React.DOM.button({onClick: this.toggleFilter, style: this.state.style}, this.props.buttonLabel /* + " " +this.state.openOrFiltered*/);
		}
	})
});