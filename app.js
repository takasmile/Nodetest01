var http = require('http')
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end("<html>" +
        "<head>" +
        "<title>Node.js test</title>" +
        "</head>" +
        "<body>" +
        "<div>Hi Adyline , I love you so much.</div>" +
        "</body>" +
        "</html>")
}).listen(1337, "127.0.0.1")
console.log(`Server running at http://127.0.0.1:1377`)