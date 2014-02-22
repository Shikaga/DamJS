require(['https://raw.github.com/cujojs/meld/master/meld.js',
    'http://knockoutjs.com/downloads/knockout-3.0.0.js',
    'http://localhost:8080/OutgoingHandler.js'], function(meld, ko) {


    var AdvisedConstructor = meld.around(caplin.streamlink.impl.subscription.SubscriptionManager.prototype, 'send', function(joinPoint) {
        console.log('MELD', joinPoint);
        outgoingHandler.onSubscribe(joinPoint);
    });

    createCSS();
    var div = createDom();
    this.outgoingHandler = new OutgoingHandler(ko)
    this.helloText = ko.observable('Boom!!');
    ko.applyBindings(this.outgoingHandler, div);
})

function createCSS() {
    var damCSS = document.createElement("style");
    damCSS.innerHTML = "" +
        ".dam-js {" +
        "   color: white; " +
        "   background-color: black;" +
        "   width: 400px;" +
        "   position: fixed;" +
        "   height: 400px;" +
        "   right: 30px;" +
        "   top: 50px;" +
        "   border: 1px solid white;" +
        "   z-index: 10000" +
        "}" +
        "" +
        ".subscriptions {" +
        "height: 50px;" +
        "overflow-x: hidden;" +
        "overflow-y: scroll;" +
        "}" +
        "";
    document.head.appendChild(damCSS);
}

function createDom() {
    var damDiv = document.createElement("div");
    damDiv.innerHTML = "" +
        "<div class='dam-js'>" +
        "<h1></h1>" +
        "<div class='subscriptions' data-bind='foreach: subscriptionsCalled'>" +
        "   <div data-bind='text: args[0].getSubject()'></div>" +
        "   <button data-bind='click: function(data, event) { $parent.copySubscriptionToMatcher($parent, data, event) }'>Copy</button>" +
        "</div>" +
        "<div data-bind='foreach: matchers'>" +
        "   <div data-bind='text: matcher'></div>" +
        "   <input type='checkbox' data-bind='checked: filter'>" +
        "</div>" +
        "<input data-bind='value: newMatcherText' />" +
        "<button data-bind='click: addNewMatcher'>Add</button>" +
        "</div>" +
        "";
    document.body.appendChild(damDiv);
    return damDiv;
}

