import responses from '../responses';

const groups = {
  '/group/': {
    post: {
      summary: 'Create new group or remove a trainee in existing team',
      tags: ['Groups'],
      security: [{
        JWT: [],
      }],
      parameters: [{
        in: 'body',
        name: 'trainees',
        required: true,
        schema: {
          example: {
            engineers: [2, 3, 4],
          },
        },
      }],
      consumes: [
        'application/json',
      ],
      responses,

    },
  },

};

export default groups;
