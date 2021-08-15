/* eslint-disable class-methods-use-this */
import Joi from '@hapi/joi';
import Response from '../helpers/response';

class cohorts {
  static validateBody(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return Response.validationError(res, `${error}`);
    }
    return next();
  }
}
export default cohorts;
