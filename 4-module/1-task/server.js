const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  const isDir = req.url.substring(1).indexOf('/') > 0;
  switch (req.method) {
    case 'GET':
      if (isDir) {
        res.statusCode = 400;
        res.end('Nested folder don\'t' );
      }

      fs.readFile(filepath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end(err.code);
        }

        res.statusCode = 200;
        res.end(data);
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
