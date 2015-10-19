'use strict';

import rootAPI from './root/root-api';
import postsAPI from './posts/posts-api';
import usersAPI from './users/users-api';
import sessionAPI from './session/session-api';

export default {
  '/': {
    methods: {
      get: {
        security: ['public', 'member', 'admin'],
        callbacks: rootAPI.root
      }
    },
    routes: {
      '_session': {
        methods: {},
        routes: {
          'login': {
            methods: {
              post: {
                security: ['public', 'member', 'admin'],
                callbacks: sessionAPI.login
              }
            }
          },
          'logout': {
            methods: {
              post: {
                security: ['public', 'member', 'admin'],
                callbacks: sessionAPI.login
              }
            }
          }
        }
      },
      'posts': {
        methods: {
          get: {
            security: ['public', 'member', 'admin'],
            callbacks: postsAPI.fetch
          }
        },
        routes: {
          ':postId': {
            methods: {
              get: {
                security: ['public', 'member', 'admin'],
                callbacks: postsAPI.fetchById
              },
              'delete': {
                security: ['member', 'admin'],
                callbacks: postsAPI.deleteById
              },
              post: {
                security: ['member', 'admin'],
                callbacks: postsAPI.create
              },
              put: {
                security: ['member', 'admin'],
                callbacks: postsAPI.updateById
              }
            }
          }
        }
      },
      'users': {
        methods: {
          get: {
            security: 'admin',
            callbacks: usersAPI.fetch
          }
        },
        routes: {
          ':userId': {
            methods: {
              get: {
                security: ['member', 'admin'],
                callbacks: usersAPI.fetchById
              },
              'delete': {
                security: 'admin',
                callbacks: usersAPI.deleteById
              },
              post: {
                security: 'admin',
                callbacks: usersAPI.create
              },
              put: {
                security: 'admin',
                callbacks: usersAPI.updateById
              }
            }
          }
        }
      }
    }
  },
  '*': {
    methods: {
      use: {
        callbacks: function (req, res) {
          res.status(404);
          res.send('Page not found!');
        }
      }
    }
  }
};
