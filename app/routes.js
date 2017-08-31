module.exports = [
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: 'twitter',
      handler: (request, reply) => {
        if (!request.auth.isAuthenticated) {
          request.auth.session.clear();
          return reply('Login failed...');
        }

        request.auth.session.set({
          username: request.auth.credentials.profile.username
        });
        return reply.redirect('/private');
      }
    }
  },
  {
    method: 'GET',
    path: '/private',
    config: {
      auth: 'session',
      handler: (request, reply) => {
        return reply(request.auth);
      }
    }
  }
];
