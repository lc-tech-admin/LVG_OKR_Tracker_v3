/**
 * LVG OKR Dashboard — Local Server
 * No dependencies needed. Just run: node server.js
 * Then open: http://localhost:3000
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Serve index.html for root
  const urlPath   = req.url === '/' ? '/index.html' : req.url;
  const filePath  = path.join(__dirname, urlPath);
  const ext       = path.extname(filePath).toLowerCase();
  const mime      = MIME[ext] || 'text/plain';

  // Basic security — don't serve files outside this folder
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 — Not found: ${urlPath}`);
      } else {
        res.writeHead(500);
        res.end('Server error: ' + err.message);
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('  ✅  LVG OKR Dashboard is running');
  console.log('');
  console.log(`  Open this in your browser:  http://localhost:${PORT}`);
  console.log('');
  console.log('  Press Ctrl+C to stop.');
  console.log('');
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  ❌  Port ${PORT} is already in use.`);
    console.error(`  Try: node server.js ${PORT + 1}`);
  } else {
    console.error('\n  ❌  Server error:', err.message);
  }
  process.exit(1);
});
