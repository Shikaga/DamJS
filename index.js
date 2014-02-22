require(['https://raw.github.com/cujojs/meld/master/meld.js',
    'http://knockoutjs.com/downloads/knockout-3.0.0.js',
    'http://bladerunnerjs.github.io/emitr/target/single/emitr.js'], function(meld, ko, emitr) {
//    var AdvisedConstructor = meld.around(caplin.streamlink.StreamLink.prototype, 'subscribe', function(joinPoint) {
//        console.log('MELD', joinPoint);
//        return joinPoint.proceed();
//    });
    x = emitr;
    createCSS();
    var div = createDom();
    this.helloText = ko.observable('Boom!');
    ko.applyBindings(this, div);
})

function createCSS() {
    var damCSS = document.createElement("style");
    damCSS.innerHTML = "" +
        ".dam-js {" +
        "   color: white; " +
        "   background-color: black;" +
        "   width: 200px;" +
        "   position: fixed;" +
        "   height: 200px;" +
        "   right: 30px;" +
        "   border: 1px solid white;" +
        "}" +
        "";
    document.head.appendChild(damCSS);
}

function createDom() {
    var damDiv = document.createElement("div");
    damDiv.innerHTML = "" +
        "<div class='dam-js'>" +
        "   What's up doc?" +
        "<div data-bind='text: helloText'></div>" +
        "</div>" +
        "";
    document.body.appendChild(damDiv);
    return damDiv;
}

