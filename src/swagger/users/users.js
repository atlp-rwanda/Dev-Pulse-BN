import responses from '../responses';

const users = {
  '/users/auth/google': {
    get: {
      tags: ['Users'],
      summary: 'Login to devpulse',
    },

  },
  '/users/all': {
    get: {
      tags: ['Users'],
      security: [{
        JWT: [],
      }],
      summary: 'get All users',
      consumes: [
        'application/json',
      ],
      responses,
    },

  },
  '/users': {
    get: {
      tags: ['Users'],
      security: [{
        JWT: [],
      }],
      summary: 'get engineers corresponding to currentry logged in manager',
      consumes: [
        'application/json',
      ],
      responses,
    },

  },
  '/users/my-profile': {
    get: {
      tags: ['Users'],
      security: [{
        JWT: [],
      }],
      summary: 'get all information about the logged in user',
      consumes: [
        'application/json',
      ],
      responses,
    },

  },
  '/users/{id}': {
    get: {
      tags: ['Users'],
      security: [{
        JWT: [],
      }],
      summary: 'Get all information about specific user',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'user\'s id',
          required: true,
        },

      ],
      consumes: [
        'application/json',
      ],
      responses,
    },

  },
  '/users/make-lf': {
    patch: {
      tags: ['Users'],
      security: [{
        JWT: [],
      }],
      summary: 'Grant specified user LF role',
      parameters: [
        {
          name: 'email',
          in: 'body',
          description: 'user \'s email',
          required: true,
          schema: {
            example: {
              email: 'mail@domain.com',
            },
          },
        },

      ],
      consumes: [
        'application/json',
      ],
      responses,
    },

  },
  '/users/{id}/cohort/{cohort}': {
    put: {
      tags: ['Users'],
      security: [{
        JWT: [],
      }],
      summary: 'Change trainee\'s cohort',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'user \'s id',
          required: true,
        },
        {
          name: 'cohort',
          in: 'path',
          description: 'cohort id',
          required: true,
        },

      ],
      consumes: [
        'application/json',
      ],
      responses,
    },
  },
  '/users/{id}/program/{program}': {
    put: {
      tags: ['Users'],
      security: [{
        JWT: [],
      }],
      summary: 'Change trainee\'s program',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'user \'s id',
          required: true,
        },
        {
          name: 'program',
          in: 'path',
          description: 'program id',
          required: true,
        },

      ],
      consumes: [
        'application/json',
      ],
      responses,
    },
  },
};

export default users;
