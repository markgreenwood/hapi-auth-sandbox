const Hapi = require('hapi');
const Cookie = require('hapi-auth-cookie');
const Bell = require('bell');
const Blipp = require('blipp');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 9000, host: '127.0.0.1' });
server.register([
  Cookie,
  Bell,
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
      isSecure: true,
      redirectTo: '/login',
      redirectOnTry: false
    }
  );
  // Acquire the clientId and clientSecret by creating a
  // Twitter application at https://apps.twitter.com/app/new
  server.auth.strategy(
    'twitter',
    'bell',
    {
      provider: 'twitter',
      password: 'oksothispasswordneedstobebiggeratleast32characterstoo',
      clientId: 'Yf3Aqjlrsn5EJ8N4G36ubVE7B',
      clientSecret: 'DYQ64DokvR73YAR4VIWaDBiHPQCSkl3m7sr2JiglyiECV6so0G',
      isSecure: true
    }
  );
  server.route(routes);
  server.start(() => {});
});
