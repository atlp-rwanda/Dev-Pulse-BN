import responses from '../responses';

const allowedEmails = {
  '/emails': {
    post: {
      summary: 'Authorize one or many gmail accounts',
      tags: ['Emails'],
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: {
            type: "object",
            properties:{
              token:{
                type:"string"
              } 
           }
          },
        },
        {
          in: 'body',
          name: 'emails',
          required: true,
          schema: {
            example: {
              emails: ['devpulse@gmail.com', 'dev.pulse@gmail.com'],
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    delete: {
      summary: 'Remove one or many gmail accounts from the list',
      tags: ['Emails'],
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: {
            type: "object",
            properties:{
              token:{
                type:"string"
              } 
           }
          },
        },
        {
          in: 'body',
          name: 'emails',
          required: true,
          schema: {
            example: {
              emails: ['devpulse@gmail.com', 'dev.pulse@gmail.com'],
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default allowedEmails;
