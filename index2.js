(function() {
    setTimeout(function () {
        debugger;
    w = window;
    d = w.document;
    var s = d.createElement('script');
    s.src = 'http://fb.me/react-0.11.1.min.js';
    s.onload = function() {
        var s = d.createElement('script');
        s.src = 'http://localhost:8080/DamJS2.js';
        s.onload = function() {
        };
        d.head.appendChild(s);
    }
    d.head.appendChild(s);
//            d.head.appendChild(s);
    });
})();


//(function(){
//    var styles =
//        '#reactive-table-overlay {\
//          background: rgba(0, 0, 0, 0.7);\
//          position: fixed;\
//          width: 100%;\
//          height: 100%;\
//          top: 0;\
//          left: 0;\
//        }\
//        #reactive-table-iframe {\
//          width: 90%;\
//          height: 90%;\
//          padding: 5%;\
//        }';
//
//    function $$(s) {
//        return Array.prototype.slice.call(document.querySelectorAll(s));
//    }
//    function $(s) {
//        return $$(s)[0];
//    }
//
//    (function () {
//        $$('table').forEach(function(table, idx) {
//            var button = document.createElement('button');
//            button.innerHTML = 'pop &#8599;';
//            button.onclick = pop.bind(null, idx);
//            table.parentNode.insertBefore(button, table);
//        });
//        var s = document.createElement('style');
//        s.textContent = styles;
//        document.head.appendChild(s);
//    }());
//
//    function pop(id) {
//        var overlay = document.createElement('div');
//        overlay.id = 'reactive-table-overlay';
//        overlay.onclick = function() {
//            document.body.removeChild(overlay);
//        };
//
//        var iframe = document.createElement('iframe');
//        iframe.id = 'reactive-table-iframe';
//        overlay.appendChild(iframe);
//
//        document.body.appendChild(overlay);
//
//        var w, d;
//        setTimeout(function () {
//            w = iframe.contentWindow;
//            d = w.document;
//            var s = d.createElement('script');
//            s.src = 'http://fb.me/react-0.11.1.min.js';
//            s.onload = function() {
//                var s = d.createElement('script');
//                s.src = 'http://localhost:8080/DamJS2.js';
//                s.onload = populate;
//                d.head.appendChild(s);
//            }
//            d.head.appendChild(s);
//            s = d.createElement('style');
//            s.textContent =
//                'html{font-family:Arial;background:white}\
//                td{border-top:1px solid black;padding:5px;cursor:cell}\
//                th{padding:5px;cursor:pointer}\
//                table{margin: 20px;border:1px solid black}\
//                .tools{margin: 20px}\
//                .tools button,.tools a{\
//                  border-radius:3px;border: 1px solid black;color:black;\
//                  background: #ddd;font:20px/24px Arial;\
//                  margin-right: 5px;padding: 5px;text-decoration: none}';
//            d.head.appendChild(s);
//        }, 0);
//
//        function populate() {
//            var headers, data;
//            var table = $$('table')[id];
//            var head = [].slice.call(table.getElementsByTagName('th'));
//            if (!'0' in head) {
//                head = [].slice.call(
//                    table.getElementsByTagName('thead').getElementsByTagName('td'));
//            }
//            headers = head.reduce(function(res, th) {
//                res.push(th.textContent);
//                return res;
//            }, []);
//
//            var body = [].slice.call(table.getElementsByTagName('tr'), 1);
//            data = body.reduce(function(res, tr) {
//                var tds = tr.getElementsByTagName('td'), row = [];
//                for (var i = 0; i < tds.length; i++) {
//                    row.push(tds[i].textContent);
//                }
//                res.push(row);
//                return res;
//            }, []);
//
//            var table = w.React.renderComponent(
//                w.Table({
//                    headers: headers,
//                    data: data
//                }), d.body);
//        }
//    }
//
//}());