function MockJoinPoint() {
    this.args = [];
    this.proceed = sinon.stub().returns('test');
    this.target = null;
}

function MockSubscriptionImpl(subject) {
    this.subject = subject;
    this.getSubject = sinon.stub().returns(this.subject);
}

function MockRecordType1Event(subject) {
    this.subject = subject;
    this.getSubject = sinon.stub().returns(this.subject);
}

module("Outgoing Tests", {
    setup: function() {
        jp = new MockJoinPoint();
        jp.args[0] = new MockSubscriptionImpl('/FX/EURUSD');
        dataJp = new MockJoinPoint();
        dataJp.target = new MockRecordType1Event('/FX/EURUSD');
    }
})

test( "returns subscriptionManager", function() {
    var oh = new OutgoingHandler(ko);
    var returnedData = oh.onSubscribe(jp);
    ok( jp.proceed.called);
    equal('test', returnedData);
});


test( "matchers let subscriptions through by default", function() {
    var oh = new OutgoingHandler(ko);
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();
    oh.onSubscribe(jp);
    ok( jp.proceed.called );
});

test( "matchers stop subscriptions when activated", function() {
    var oh = new OutgoingHandler(ko);
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();
    matcher.outFilter(true);
    oh.onSubscribe(jp);
    ok( !jp.proceed.called );
});

test( "matchers only stop subscriptions they match", function() {
    var unfilteredJP = new MockJoinPoint();
    unfilteredJP.args[0] = new MockSubscriptionImpl('/FX/USDCHF');

    var oh = new OutgoingHandler(ko);
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();
    oh.newMatcherText('/FX/USDCHF');
    var matcher2 = oh.addNewMatcher();
    matcher.outFilter(true);

    oh.onSubscribe(jp);
    oh.onSubscribe(unfilteredJP);
    ok( !jp.proceed.called );
    ok( unfilteredJP.proceed.called );
});

// SUBSCRIPTIONS

test( "lists subscriptions that it sees", function() {
    var oh = new OutgoingHandler(ko);
    equal( 0, oh.subscriptionsCalled().length);

    oh.onSubscribe(jp);
    equal( 1, oh.subscriptionsCalled().length);

    oh.onSubscribe(jp);
    equal( 2, oh.subscriptionsCalled().length);
});

test( "Copy subscription to matcher", function() {
    var oh = new OutgoingHandler(ko);
    equal( 0, oh.subscriptionsCalled().length);

    oh.onSubscribe(jp);
    oh.copySubscriptionToMatcher(oh, oh.subscriptionsCalled()[0]);

    equal( 1, oh.matchers().length);
    equal( '/FX/EURUSD', oh.matchers()[0].matcher);
});

// DATA

test( "lets data through by default", function() {
    var oh = new OutgoingHandler(ko);
    var returnedData = oh.onData(dataJp);
    ok( dataJp.proceed.called);
    equal("test", returnedData);
});

test( "matchers let data through by default", function() {
    var oh = new OutgoingHandler(ko);
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();

    oh.onData(dataJp);
    ok( dataJp.proceed.called );
});

test( "matchers stop subscriptions when activated", function() {
    var oh = new OutgoingHandler(ko);
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();
    matcher.inFilter(true);

    oh.onData(dataJp);
    ok( !dataJp.proceed.called );
});

test( "matchers only stop subscriptions they match", function() {
    var unfilteredJP = new MockJoinPoint();
    unfilteredJP.target = new MockRecordType1Event('/FX/USDCHF');

    var oh = new OutgoingHandler(ko);
    oh.newMatcherText('/FX/EURUSD');
    var matcher = oh.addNewMatcher();
    oh.newMatcherText('/FX/USDCHF');
    var matcher2 = oh.addNewMatcher();
    matcher.inFilter(true);

    oh.onData(dataJp);
    oh.onData(unfilteredJP);
    ok( !dataJp.proceed.called );
    ok( unfilteredJP.proceed.called );
});
