import responses from '../responses';

const ratings = {
  '/ratings/rate': {
    post: {
      tags: ['Rating'],
      security: [{
        JWT: [],
      }],
      summary: 'Rate an engineer',
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
          name: 'body',
          required: true,
          schema: {
            example: {
              trainee: 2,
              quality: { feedback: 'feedback1', rate: 2 },
              quantity: { feedback: 'feddback2', rate: 2 },
              communication: { feedback: 'feedback4', rate: 2 },
            },
          },
        },
      ],
      consumes: [
        'application/json',
      ],
      responses,
    },
    get: {
      tags: ['Rating'],
      security: [{
        JWT: [],
      }],
      summary: 'Get all ratings for each  Engineer/Trainee',
      parameters:[
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
      ],
      consumes: [
        'application/json',
      ],
      responses,

    },
  },
  '/ratings/rate/{id}': {
    patch: {
      tags: ['Rating'],
      security: [{
        JWT: [],
      }],
      summary: 'Modify rates of en engineer',
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
          in: 'path',
          name: 'id',
          required: true,
          description: 'rate id',
        },
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            example: {
              trainee: 2,
              quality: { feedback: 'feedback1', rate: 2 },
              quantity: { feedback: 'feddback2', rate: 2 },
              communication: { feedback: 'feedback4', rate: 2 },
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
  '/ratings': {
    get: {
      tags: ['Rating'],
      security: [{
        JWT: [],
      }],
      summary: 'Get Average rating for each  Engineer/Trainee',
      parameters:[
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
      ],
      consumes: [
        'application/json',
      ],
      responses,
    },

  },
  '/ratings/{id}': {
    get: {
      tags: ['Rating'],
      security: [{
        JWT: [],
      }],
      summary: 'Get average and all rating history of a specific  Engineer/Trainee',
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
          in: 'path',
          name: 'id',
          required: true,
          description: 'Trainee id',
        },
      ],
      consumes: [
        'application/json',
      ],
      responses,

    },
  },

};

export default ratings;
