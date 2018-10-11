const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000 // accesses node environment variables

const server = http.createServer(app); // express app qualifies as request handler

server.listen(port);