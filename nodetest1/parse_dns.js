var queystring = require('querystring');
var dns = require('dns');

exports.parseDns = function (res, req) {
    var postData = '';
    req.addListener('data', function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListender('end', function () {
         var rectData = getDns(postData, function (domain, address) {
             res.writeHead(200, {'Content-Type': 'text/html'});
             res.end("<html>" +
                 "<head>" +
                 "<meta http-equiv='content-type' content='text/html;charset=utf8'>" +
                 "</head>" +
                 "<div style='text-align: center'>" +
                 "Domain:<span style='color: red'>" + domain + "</span>" +
                 "IP:<span style='color: red'>" + address.join(',') + "</span>" +
                 "</div>" +
                 "</html>")
         });
         return;
    });

    function getDns (postData, callback) {
        var domain = queystring.parse(postData).search;//******************
        dns.resolve(domain, function (err, address) {
            if (!address) {
                address = ['不存在域名'];
            }
            callback(domain, address);
        });
    }
}