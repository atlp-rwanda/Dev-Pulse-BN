/* eslint-disable class-methods-use-this */
import response from '../helpers/response';
import cohortService from '../services/cohortService';

class cohortsController {
  static async addCohort(req, res) {
    try {
      await cohortService.addCohort(req.body);
      return response.customResponse(res, 201, 'cohort added ', []);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  static async getAllCohorts(req, res) {
    try {
      const cohorts = await cohortService.getAllCohorts();
      return response.customResponse(res, 200, 'cohorts retrieved', cohorts);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }
}
export default cohortsController;
