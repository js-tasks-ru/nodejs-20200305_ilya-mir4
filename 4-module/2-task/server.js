const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

const server = new http.Server();


server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);
  const isDir = req.url.substring(1).indexOf('/') > 0;

  switch (req.method) {
    case 'POST':
      if (isDir) {
        res.statusCode = 400;
        res.end('Nested folder don\'t' );
        return;
      }

      const file = fs.createWriteStream(filepath, {flags: 'wx'});
      const LimitSize = new LimitSizeStream({limit: 1e6});

      file.on('error', (err) => {
        if (err.code === 'EEXIST') {
          res.statusCode = 409;
          res.end('already exist');
          return;
        }

        res.statusCode = 500;
        res.end('Internal server error ');
      });


      req.on('aborted', () => {
        fs.unlink(filepath, () => {});
        res.end('Internal server error ');
      });

      LimitSize.on('error', (err) => {
        if (err.code === 'LIMIT_EXCEEDED') {
          res.statusCode = 413;
          res.end('too big');
          fs.unlink(filepath, () => {});
          return;
        }

        res.statusCode = 500;
        res.end('Internal server error ');
      });

      req.pipe(LimitSize).pipe(file);

      file.on('close', () => {
        res.statusCode = 201;
        res.end('saved');
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});


module.exports = server;
