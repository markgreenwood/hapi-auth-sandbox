module.exports = [
  {
    method: ['GET', 'POST'],
    path: '/login',
    config: {
      auth: 'twitter',
      handler: (request, reply) => {
        if (!request.auth.isAuthenticated) {
          request.cookieAuth.clear();
          return reply('Login failed...');
        }

        request.cookieAuth.set({
          username: request.auth.credentials.profile.username
        });
        return reply.redirect('/private');
      }
    }
  },
  {
    method: 'GET',
    path: '/public',
    config: {
      auth: false,
      handler: (request, reply) => {
        return reply({ statusCode: 200, message: 'OK' });
      }
    }
  },
  {
    method: 'GET',
    path: '/private',
    config: {
      auth: 'session',
      handler: (request, reply) => {
        let pageHtml = `
        <h1>Private Route</h1>
        <h3>Logged in as ${request.auth.credentials.username}</h3>
        <a href="/logout">Log out</a>`;

        return reply(pageHtml);
      }
    }
  }
];
