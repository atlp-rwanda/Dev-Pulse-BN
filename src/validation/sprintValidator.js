import Joi from '@hapi/joi';
import Response from '../helpers/response';

class programsValidator {
  static async validateSprint(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required(),
      programId: Joi.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return Response.validationError(res, `${error}`);
    }
    return next();
  }
}

export default programsValidator;
