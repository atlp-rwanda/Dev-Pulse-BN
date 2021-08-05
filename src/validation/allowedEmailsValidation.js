/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import Schema from './schema';
import Response from '../helpers/response';

/**
 * @class emailsValidation
 */
export default class emailsValidation {
  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async list(req, res, next) {

    // validate gmail format
    const schema = Joi.object({
      emails: Joi.array()
        .items(Schema.gmail)
        .required()
        .error((errors) => new Error('Array of emails is required and must be gmail')),
    });
    // validator(schema, req.body, res, next);
    const { error } = schema.validate(req.body);
    if (error) return Response.validationError(res, `${error}`);
    next();
  }
}
