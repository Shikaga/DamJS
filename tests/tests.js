function MockJoinPoint() {
    this.proceed = sinon.spy();
}

test( "Outgoing Tests", function() {
    var jp = new MockJoinPoint();
    var testEmitr = new emitr;
    var oh = new OutgoingHandler(testEmitr);
    testEmitr.trigger('subscribe', jp);
    ok( jp.proceed.called, "Proceed not invoked" );
});