var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function (req, res) {
    var readpath = __dirname + '/' + url.parse('index.html').pathname
    var indexPage = fs.readFileSync(readpath)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(indexPage)
}).listen(1337)
console.log('server is running!')