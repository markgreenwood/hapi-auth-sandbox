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
      cookie: 'appAuth',
      password: 'oksothispasswordneedstobebiggeratleast32characters',
      isSecure: false,
      ttl: 120000, // 2 min time-to-live, i.e. cookie expiration
      redirectTo: '/login',
      redirectOnTry: false
    }
  );
  server.auth.default('session');
  server.route(routes);
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Starting server on ${server.info.host}:${server.info.port}`);
  });
});
