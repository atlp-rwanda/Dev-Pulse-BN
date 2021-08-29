/* eslint-disable class-methods-use-this */
import programsService from '../services/programsService';
import response from '../helpers/response';

class programsController {
  static async addProgram(req, res) {
    try {
      const program = await programsService.create(req.body);
      return response.customResponse(res, 201, 'program added ', program);
    } catch (error) {
      response.serverError(res, error);
    }
  }

  static async getPrograms(req, res) {
    try {
      const programs = await programsService.getAll();
      return response.customResponse(res, 200, 'programs retrieved', programs);
    } catch (error) {
      response.serverError(res, error);
    }
  }

  static async removeProgram(req, res) {
    try {
      const id = req.params.program;
      const program = await programsService.removeOne(id);
      return response.customResponse(res, 200, 'programs removed', program);
    } catch (error) {
      response.serverError(res, error);
    }
  }

  static async programExists(req, res, next) {
    try {
      const id = req.params.program;

      const exists = await programsService.exists(id);
      if (!exists) {
        return response.notFoundError(res, 'invalid program id');
      }

      if (exists && exists.cohortId !== req.traineeCohort) {
        return response.badRequestError(res, "Program don't match with cohort");
      }
      req.cohort = exists.cohortId;
      next();
    } catch (error) {
      response.serverError(res, error);
    }
  }

  static async updateProgram(req, res) {
    try {
      const id = req.params.program;
      await programsService.update(id, req.body);
      return response.customResponse(res, 200, 'program updated', []);
    } catch (error) {
      response.serverError(res, error);
    }
  }
}

export default programsController;
