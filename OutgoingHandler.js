var OutgoingHandler = function(ko) {
    this.ko = ko; //KO must be passed in, as different version may already be on page
    this.newMatcherText = this.ko.observable("/FX/EURUSD/SPOT/EUR/500");
    this.matchers = this.ko.observableArray();
    this.subscriptionsCalled = this.ko.observableArray();
    var self = this;
}

OutgoingHandler.prototype.addNewMatcher = function() {
    return this._addMatcher(this.newMatcherText());
}

OutgoingHandler.prototype._addMatcher = function(subscription) {
    var matcher = {
        matcher: subscription,
        filter: this.ko.observable(false)
    }
    this.matchers.push(matcher);
    return matcher
}

OutgoingHandler.prototype.copySubscriptionToMatcher = function(self, subscription) {
    //Architecture of KO prevents knowing object when method invoked
    self._addMatcher(subscription.args[0].getSubject());
}

OutgoingHandler.prototype.onSubscribe = function(joinPoint) {
    this.subscriptionsCalled.push(joinPoint);

    var subject = joinPoint.args[0].getSubject();
    var filtered = false;
    this.matchers().forEach(function(matcher){
        if (matcher.filter() && subject === matcher.matcher) filtered = true;
    });
    if (!filtered) {
        return joinPoint.proceed();
    }
}