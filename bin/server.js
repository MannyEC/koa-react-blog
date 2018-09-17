const config = require('../config');
const server = require('../server/main');
const debug = require('debug');

const newDebug = debug('app:bin:server');

const port = config.server_port;
const host = config.server_host;

server.listen(port);
newDebug(`Server is now running at http://${host}:${port}.`);
newDebug(`Server accessible via localhost:${port} if you are using the project defaults.`);
