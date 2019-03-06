require('dotenv').config();

const getConnectionString = require('./src/utils/get-connection-string');
require('./src/config/database')(getConnectionString());

const app = require('./src/config/express'),
    http = require('http');

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => console.log(`Server running at ${port}`));

module.exports = server;