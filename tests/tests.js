function MockJoinPoint() {
    this.args = [];
    this.proceed = sinon.stub().returns('test');
}

function MockSubscriptionImpl(subject) {
    this.subject = subject;
    this.getSubject = sinon.stub().returns(this.subject);
}

module("Outgoing Tests", {
    setup: function() {
        jp = new MockJoinPoint();
        jp.args[0] = new MockSubscriptionImpl('/FX/EURUSD');
    }
})

test( "lets subscriptions through by default", function() {
    var oh = new OutgoingHandler();
    oh.onSubscribe(jp);
    ok( jp.proceed.called);
});

test( "returns subscriptionManager", function() {
    var oh = new OutgoingHandler();
    var returnedData = oh.onSubscribe(jp);
    ok( jp.proceed.called);
    equal('test', returnedData);
});


test( "matchers let subscriptions through by default", function() {
    var oh = new OutgoingHandler();
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();
    oh.onSubscribe(jp);
    ok( jp.proceed.called );
});

test( "matchers stop subscriptions when activated", function() {
    var oh = new OutgoingHandler();
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();
    matcher.filter(true);
    oh.onSubscribe(jp);
    ok( !jp.proceed.called );
});

test( "matchers only stop subscriptions they match", function() {
    var unfilteredJP = new MockJoinPoint();
    unfilteredJP.args[0] = new MockSubscriptionImpl('/FX/USDCHF');

    var oh = new OutgoingHandler();
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();
    oh.newMatcherText('/FX/USDCHF');
    var matcher2 = oh.addNewMatcher();
    matcher.filter(true);

    oh.onSubscribe(jp);
    oh.onSubscribe(unfilteredJP);
    ok( !jp.proceed.called );
    ok( unfilteredJP.proceed.called );
});