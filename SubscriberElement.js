define(['lib/react'], function(React) {
	return React.createClass({
    subscribe: function() {
      if (typeof damJSStreamLink !== "undefined") {
        damJSStreamLink.subscribe(this.state.subject,
          {
        		onSubscriptionStatus : function(subscription, event) {
              console.log(subscription.getSubject() + " is now " + event.getStatus());
        		},

        		onSubscriptionError : function(subscription, event)	{
              console.log("Error: Subject " + subscription.getSubject() + " is " + event.getError());
        		},

        		onRecordUpdate : function(subscription, event) {
              console.log(event.getSubject(), event.getFields())
        		}
          }
      )
      } else {
        alert('Make a real subscription first!');
      }
    },
    getInitialState:function() {
      return {subject: "/FX/EURUSD/SPOT/EUR/100"}
    },
    setSubject:function(e) {
      this.setState({
        subject: e.target.value
      })
    },
		render: function() {
			return React.DOM.div({},
        React.DOM.button({onClick: this.props.back}, "Back"),
        React.DOM.input({value: this.state.subject, onChange: this.setSubject}),
        React.DOM.button({onClick: this.subscribe},"Subscribe")
      );
		}
	});
});
