
var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

var httpPort = 5000;

var pump;
var server = http.createServer(function(req, res) {
  var reqUrl = url.parse(req.url, true /* parse query */);
  var reqPath = reqUrl.pathname;
  if (reqPath === '/') {
    reqPath = 'index.html';
  }

  var file = path.join(__dirname, reqPath);
  fs.readFile(file, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }

    res.writeHead(200);
    res.end(data);
  });
});

server.listen(httpPort);
console.log('Listening on port ' + httpPort);
