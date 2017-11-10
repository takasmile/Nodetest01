var http = require('http'),
    url = require('url');
var router = require('./router.js');

http.createServer(function (req, res) {
   var pathname = url.parse(req.url).pathname;
   req.setEncoding('utf8');
   res.writeHead(200, {'Counter-Type': "text/html"});
   router.router(res, req, pathname);
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');