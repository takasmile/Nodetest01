var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname
    console.log(req.url)
    console.log(req.method)
    console.log(req.headers)

    switch(pathname) {
        case '/index':
            resIndex(res)
            break;
        case '/img':
            resImagin(res)
            break;
        default:
            resDefault(res)
            break;
    }
}).listen(3000)

function resIndex (res) {
    var readPath = __dirname + '/' + url.parse('index.html').pathname
    var indexPage = fs.readFileSync(readPath)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(indexPage)
}
function resImagin (res) {
    var readPath = __dirname + '/' + url.parse('timg.jpg').pathname
    var indexPage = fs.readFileSync(readPath)
    res.writeHead(200, {'Content-Type': 'image/jpg'})
    res.end(indexPage)
}
function resDefault (res) {
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.end('can not find source')
}