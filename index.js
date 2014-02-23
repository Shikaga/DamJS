require(['https://raw.github.com/cujojs/meld/master/meld.js',
    'http://knockoutjs.com/downloads/knockout-3.0.0.js',
    'http://localhost:8080/OutgoingHandler.js'], function(meld, ko) {


    meld.around(
        caplin.streamlink.impl.subscription.SubscriptionManager.prototype, 'send', function(joinPoint) {
        console.log('MELD', joinPoint);
        outgoingHandler.onSubscribe(joinPoint);
    });

    meld.around(
        caplin.streamlink.impl.event.RecordType1EventImpl.prototype, '_publishSubscriptionResponse', function(joinPoint) {
            console.log('MELD INCOMING', this.getSubject(), this.getFields());
            outgoingHandler.onData(joinPoint);
        }
    )

    createCSS();
    var div = createDom();
    this.outgoingHandler = new OutgoingHandler(ko)
    this.helloText = ko.observable('Boom!!');
    ko.applyBindings(this.outgoingHandler, div);
})

function createCSS() {
    var damCSS = document.createElement("style");
    damCSS.innerHTML = "" +
        ".dam-js > h1 {" +
        "   margin-bottom: 0px;" +
        "   margin-top: 0px;" +
        "   background-color: rgb(0, 0, 0);" +
        "   color: white;" +
        "}" +
        ".dam-js {" +
        "   outline: 10px solid rgba(256,256,256,0.1);" +
        "   color: white; " +
        "   background-color:black;" +
        "   width: 400px;" +
        "   position: fixed;" +
        "   height: 400px;" +
        "   right: 30px;" +
        "   top: 50px;" +
        "   border: 1px solid white;" +
        "   z-index: 10000;" +
        "   overflow-y: scroll;" +
        "}" +
        "" +
        ".subscriptions {" +
        "   height: 100px;" +
        "   overflow-x: hidden;" +
        "   overflow-y: scroll;" +
        "   color: rgb(41,41,41);" +
        "   background: -webkit-linear-gradient(top, #f5f5f5 0%, #b7b6b4 100%);" +
        "}" +
        "" +
        ".subscription-copy {" +
        "   width: 50px;" +
        "}" +
        "" +
        ".subscription-subject {" +
        "   width: 300px;" +
        "   display: inline-block;" +
        "}" +
        "" +
        ".matcher-matcher {" +
        "   width: 340px;" +
        "   display: inline-block;" +
        "}" +
        "" +
        ".matchers {" +
        "   height: 100px;" +
        "   color: rgb(41,41,41);" +
        "   background: -webkit-linear-gradient(top, #f5f5f5 0%, #b7b6b4 100%);" +
        "}" +
        "" +
        ".intercepted {" +
        "   height: 200px;" +
        "   overflow-y: scroll;" +
        "   color: rgb(41,41,41);" +
        "   background: -webkit-linear-gradient(top, #f5f5f5 0%, #b7b6b4 100%);" +
        "}" +
        "";
    document.head.appendChild(damCSS);
}

function createDom() {
    var damDiv = document.createElement("div");
    damDiv.innerHTML = "" +
        "<div class='dam-js'>" +
        "<h1>Subscriptions</h1>" +
        "<div class='subscriptions' data-bind='foreach: subscriptionsCalled'>" +
        "   <button class='subscription-copy' data-bind='click: function(data, event) { $parent.copySubscriptionToMatcher($parent, data, event) }'>Copy</button>" +
        "   <div class='subscription-subject'  data-bind='text: args[0].getSubject()'></div>" +
        "</div>" +
        "<h1>Matchers</h1>" +
        "<div class='matchers' data-bind='foreach: matchers'>" +
        "   <input type='checkbox' data-bind='checked: inFilter'>" +
        "   <input type='checkbox' data-bind='checked: outFilter'>" +
        "   <div class='matcher-matcher' data-bind='text: matcher'></div>" +
        "</div>" +
        "<input data-bind='value: newMatcherText' />" +
        "<button data-bind='click: addNewMatcher'>Add</button>" +
        "<h1>Intercepted Messages</h1>" +
        "<div class='intercepted' data-bind='foreach: interceptedData'>" +
        "   <button class='subscription-copy' data-bind='click: function(data, event) { $parent.forwardInterceptedData($parent, data, event) }'>Forward</button>" +
        "   <div class='matcher-matcher' data-bind='text: target.getSubject()'></div>" +
        "   <div data-bind='foreach: damFields()'>" +
        "       <div data-bind='text: key'></div>:" +
        "       <div data-bind='text: value'></div>" +
        "   </div>" +
        "</div>" +
        "</div>" +
        "";
    document.body.appendChild(damDiv);
    return damDiv;
}

