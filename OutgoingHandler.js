var OutgoingHandler = function(ko) {
    this.ko = ko;
    this.newMatcherText = this.ko.observable("/FX/EURUSD/SPOT/EUR/500");
    this.matchers = this.ko.observableArray();
}

OutgoingHandler.prototype.addNewMatcher = function() {
    var self = this;
    var matcher = {
        matcher: self.newMatcherText(),
        filter: this.ko.observable(false)
    }
    this.matchers.push(matcher);
    return matcher
}

OutgoingHandler.prototype.onSubscribe = function(joinPoint) {
    var subject = joinPoint.args[0].getSubject();
    var filtered = false;
    this.matchers().forEach(function(matcher){
        if (matcher.filter() && subject === matcher.matcher) filtered = true;
    });
    if (!filtered) {
        return joinPoint.proceed();
    }
}