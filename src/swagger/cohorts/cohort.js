import responses from '../responses';

const cohorts = {
  '/cohorts/': {
    post: {
      summary: 'Add new Cohort',
      tags: ['Cohorts'],
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          in: 'body',
          name: 'name',
          required: true,
          schema: {
            example: {
              name: 'cohort 2',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      summary: 'get all Cohort',
      tags: ['Cohorts'],
      security: [
        {
          JWT: [],
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/cohorts/{cohortId}': {
    patch: {
      summary: 'Update Cohort',
      tags: ['Cohorts'],
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          in: 'body',
          name: 'name',
          required: true,
          schema: {
            example: {
              name: 'cohort 2',
            },
          },
        },
        {
          in: 'path',
          name: 'cohortId',
          required: true,
          schema: {
            example: 1,
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    delete: {
      summary: 'Delete Cohort',
      tags: ['Cohorts'],
      parameters: [
        {
          in: 'path',
          name: 'cohortId',
          required: true,
          schema: {
            example: 1,
          },
        },
      ],
      security: [
        {
          JWT: [],
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default cohorts;
