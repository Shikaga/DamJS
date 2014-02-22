var OutgoingHandler = function(emitr) {
    this.emitr = emitr;
    this.emitr.on('subscribe', function(joinPoint) {
        joinPoint.proceed();
    })
}