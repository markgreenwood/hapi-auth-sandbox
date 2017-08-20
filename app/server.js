const Hapi = require('hapi');
const Basic = require('hapi-auth-basic');
const Blipp = require('blipp');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 9000 });
server.register([
  Basic,
  { register: Blipp, options: { showAuth: true } }
], (err) => {
  const basicConfig = {
    validateFunc: (request, username, password, callback) => {
      if (username !== 'admin' || password !== 'password') {
        return callback(null, false);
      }
      return callback(null, true, { username: 'admin' });
    }
  };
  if (err) {
    throw err;
  }
  server.auth.strategy('simple', 'basic', basicConfig);
  server.auth.default('simple');
  server.route(routes);
  server.start(() => {});
});
