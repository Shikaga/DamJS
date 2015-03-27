define(['lib/react'], function(React) {
	return React.createClass({
    getInitialState: function() {
      return {value: this.props.value}
    },
    onInputChange: function(e){
      findPermissioningHandler().getSubscriptionListener()._compositePermissionEngine.m_mEngines.MASTER.m_mUsers[username].m_mPermissions[this.props.context].m_mPermissions[this.props.permissionGroup].m_mPermissions[this.props.permission] = e.target.value;
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
