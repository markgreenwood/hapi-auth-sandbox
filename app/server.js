const Hapi = require('hapi');
const Cookie = require('hapi-auth-cookie');
const Blipp = require('blipp');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 9000 });
server.register([
  Cookie,
  { register: Blipp, options: { showAuth: true } }
], (err) => {
  if (err) {
    throw err;
  }
  server.auth.strategy(
    'session',
    'cookie',
    {
      cookie: 'example',
      password: 'oksothispasswordneedstobebiggeratleast32characters',
      isSecure: false,
      redirectTo: '/login',
      redirectOnTry: false
    }
  );
  server.auth.default('session');
  server.route(routes);
  server.start(() => {});
});
