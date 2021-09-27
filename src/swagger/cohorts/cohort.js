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
    get: {
      summary: 'Get Ratings by cohorts',
      tags: ['Rating'],
      security: [
        {
          JWT: [],
        },
      ],
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
      consumes: ['application/json'],
      responses,
    },
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
  '/cohorts/{cohortId}/performance': {
    get: {
      summary: 'Get Ratings by cohorts',
      tags: ['Rating'],
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'cohortId',
          required: true,
          schema: {
            example: 1,
          },
        },
        {
          in: 'query',
          name: 'from',
          required: false,
          schema: {
            example: '09/27/2020',
          },
        },
        {
          in: 'query',
          name: 'to',
          required: false,
          schema: {
            example: '09/27/2021',
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default cohorts;
