var http = require('http')
var fs = require('fs')
var url = require('url')
var BASE_DIR = __dirname

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname
    var realPath = __dirname + '/static' + pathname
    if (pathname == '/favicon.ico')
        return
    else if(pathname == '/index' || pathname == '/')
        goIndex(res)
    else
        dealWithStatic(pathname, realPath, res)
}).listen(1337)
console.log('server running')
console.log('Server running at http://localhost:1337/');

function goIndex(res){
    var readPath = BASE_DIR + '/' +url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexPage);
}

function dealWithStatic(pathname, realPath, res) {
    fs.exists(realPath, function (exists) {
        if (!exists) {
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.write('This is request URL ' + pathname + ' was not found on this server.')
            res.end()
        }
        else {
            var pointPosition = pathname.lastIndexOf('.')
            var mmieString = pathname.substring(pointPosition + 1)
            var mmieType

            switch (mmieString) {
                case 'css':
                    mmieType = 'text/css'
                    break;
                case 'png':
                    mmieType = 'image/png'
                    break;
                default:
                    mmieType = 'text/plain'
            }

            fs.readFile(realPath, 'binary', function (err, file) {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'})
                    res.end(err)
                }
                else {
                    res.writeHead(200, {'Content-Type': mmieType})
                    res.write(file, 'binary')
                    res.end()
                }
            })
        }
    })
}