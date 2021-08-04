/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

export default {
  rating: Joi.object({
    rate: Joi.number().integer().min(-2).max(2)
      .required(),
    feedback: Joi.string().trim().required(),
  }).required(),
  id: Joi.number()
    .integer()
    .min(0)
    .required()
    .error((errors) => new Error('value must be an integers')),
  gmail: Joi.string()
    .regex(/^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/)
    .required()
    .error((errors) => new Error('value must be a valid email')),
};
