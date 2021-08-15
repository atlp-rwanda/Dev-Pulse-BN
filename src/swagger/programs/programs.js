import responses from '../responses';

const programs = {
  '/programs/': {
    post: {
      summary: 'Add new program',
      tags: ['Programs'],
      security: [{
        JWT: [],
      }],
      parameters: [{
        in: 'body',
        name: 'program',
        required: true,
        schema: {
          example: {
            name: 'project work',
            start_date: '2021-09-28',
            end_date: '2021-12-30',
            cohortId: 1,
          },
        },
      }],
      consumes: [
        'application/json',
      ],
      responses,

    },
    get: {
      summary: 'get all programs',
      tags: ['Programs'],
      security: [{
        JWT: [],
      }],
      consumes: [
        'application/json',
      ],
      responses,

    },
  },
  '/programs/{program}': {
    patch: {
      summary: 'update program',
      tags: ['Programs'],
      security: [{
        JWT: [],
      }],
      parameters: [
        {
          in: 'path',
          name: 'program',
          required: true,
        },
        {
          in: 'body',
          name: 'program',
          required: true,
          schema: {
            example: {
              name: 'project work',
              start_date: '2021-09-28',
              end_date: '2021-12-30',
              cohortId: 1,
            },
          },
        }],
      consumes: [
        'application/json',
      ],
      responses,

    },
    delete: {
      summary: 'delete program',
      tags: ['Programs'],
      security: [{
        JWT: [],
      }],
      parameters: [{
        in: 'path',
        name: 'program',
        required: true,
      }],
      consumes: [
        'application/json',
      ],
      responses,
    },

  },

};

export default programs;
