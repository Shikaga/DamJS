define(['lib/react'], function(React) {
	return React.createClass({
		getInitialState: function() {
			if (this.props.matcher) {
				return {
					incomingInjectionFields: this.props.matcher.incomingInjectionFields,
					outgoingInjectionFields: this.props.matcher.outgoingInjectionFields
				}
			}
			return {
				incomingInjectionFields: [],
				outgoingInjectionFields: []
			}
		},
		componentWillReceiveProps: function(props) {
			if (this.props.matcher) {
				this.props.matcher.clearReact(this);
			}
			if (props.matcher) {
				props.matcher.setReact(this);
			}
		},
		componentDidMount: function() {
			this.props.matcher.setReact(this);
		},
		addIncomingRow: function() {
			this.props.matcher.addIncomingInjectionField();
		},
		addOutgoingRow: function() {
			this.props.matcher.addOutgoingInjectionField();
		},
		onIncomingValueChange: function(e) {
			this.props.matcher.updateIncomingInjectionValue(Number.parseInt(e.target.attributes.getNamedItem('data').value), e.target.value);
		},
		onIncomingKeyChange: function(e) {
			this.props.matcher.updateIncomingInjectionKey(Number.parseInt(e.target.attributes.getNamedItem('data').value), e.target.value);
		},
		onOutgoingValueChange: function(e) {
			this.props.matcher.updateOutgoingInjectionValue(Number.parseInt(e.target.attributes.getNamedItem('data').value), e.target.value);
		},
		onOutgoingKeyChange: function(e) {
			this.props.matcher.updateOutgoingInjectionKey(Number.parseInt(e.target.attributes.getNamedItem('data').value), e.target.value);
		},
		render: function() {
			var style = {
				width: "100px"
			}
			if (this.props.matcher) {
				var incomingRows = [];
				var outgoingRows = [];
				for (var i=0; i < this.state.incomingInjectionFields.length; i++) {
					incomingRows.push(React.DOM.div(null,
						React.DOM.input({style: style, data:i, onChange: this.onIncomingKeyChange, value: this.state.incomingInjectionFields[i].keyValue}),
						React.DOM.input({style: style, data:i, onChange: this.onIncomingValueChange, value: this.state.incomingInjectionFields[i].fieldValue})
					));
				}
				for (var i=0; i < this.state.outgoingInjectionFields.length; i++) {
					outgoingRows.push(React.DOM.div(null,
						React.DOM.input({style: style, data:i, onChange: this.onOutgoingKeyChange, value: this.state.outgoingInjectionFields[i].keyValue}),
						React.DOM.input({style: style, data:i, onChange: this.onOutgoingValueChange, value: this.state.outgoingInjectionFields[i].fieldValue})
					));
				}
				return React.DOM.div({style: columnStyle},
					React.DOM.button({onClick: this.props.back}, "Back"),
					React.DOM.div(null,
						"Inject Incoming Elements",
						incomingRows,
						React.DOM.button({onClick: this.addIncomingRow}, "Add Incoming Row")),
					React.DOM.div(null,
						"Inject Outgoing Elements",
						outgoingRows,
						React.DOM.button({onClick: this.addOutgoingRow}, "Add Outgoing Row")));
			} else {
				return React.DOM.button({onClick: this.props.back}, "Back");
			}
		}
	})
});
