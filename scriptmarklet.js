function loadScript(src, callback){
  var s,
      r,
      t;
  r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;  s.onload = s.onreadystatechange = function() {    /*console.log( this.readyState ); uncomment this line to see which ready states are called. */    if ( !r && (!this.readyState || this.readyState == 'complete') )
    {
      r = true;
      callback();
    }
  };
  t = document.head;
  t.appendChild(s, t);
}

loadScript("https://requirejs.org/docs/release/2.1.11/minified/require.js", function() {
	loadScript("http://localhost:8080/index.js", function() {
		console.log('?');
	})
})