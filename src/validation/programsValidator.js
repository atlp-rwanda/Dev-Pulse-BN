import Joi from '@hapi/joi';
import Response from '../helpers/response';

class programsValidator {
  static async isProgramValid(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      cohortId: Joi.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return Response.validationError(res, `${error}`);
    }
    return next();
  }

  static async isIdValid(req, res, next) {
    const schema = Joi.object({
      program: Joi.number().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
      return Response.validationError(res, `${error}`);
    }
    return next();
  }

  static updateValidator(req, res, next) {
    const schema = Joi.object({
      name: Joi.string(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      cohortId: Joi.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return Response.validationError(res, `${error}`);
    }
    return next();
  }
}

export default programsValidator;
