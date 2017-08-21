module.exports = [
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: {
        mode: 'try'
      },
      handler: (request, reply) => {
        if (request.auth.isAuthenticated === true) {
          return reply.redirect('/private');
        }
        let loginForm = `
          <form method="post" action="/login">
            Username: <input type="text" name="username" />
            <br>
            Password: <input type="password" name="password" />
            <br>
            <input type="submit" value="Login" />
          </form>
        `;
        if (request.query.login === 'failed') {
          loginForm += '<h3>Previous login attempt failed</h3>';
        }
        return reply(loginForm);
      }
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      auth: {
        mode: 'try'
      },
      handler: (request, reply) => {
        if (request.payload.username !== 'admin' ||
          request.payload.password !== 'password') {
          console.log('Login failed');
          request.cookieAuth.clear();
          return reply.redirect('/login?login=failed');
        }
        console.log('Login successful');
        request.cookieAuth.set({
          username: request.payload.username,
          lastLogin: new Date()
        });
        return reply.redirect('/private');
      }
    }
  },
  {
    method: 'GET',
    path: '/public',
    config: {
      auth: {
        mode: 'try'
      },
      handler: (request, reply) => {
        let pageHtml = `
        <h1>Public Route</h1>
        <h3>${request.auth.credentials ? 
          'Logged in as ' + request.auth.credentials.username : 
          'Not logged in'}</h3>`;

        return reply(pageHtml);
      }
    }
  },
  {
    method: 'GET',
    path: '/private',
    config: {
      handler: (request, reply) => {
        let pageHtml = `
        <h1>Private Route</h1>
        <h3>Logged in as ${request.auth.credentials.username}</h3>`;

        return reply(pageHtml);
      }
    }
  },
  {
    method: 'GET',
    path: '/logout',
    config: {
      auth: false,
      handler: (request, reply) => {
        request.cookieAuth.clear();
        return reply.redirect('/login');
      }
    }
  }
];
