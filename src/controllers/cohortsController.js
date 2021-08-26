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

  static async update(req, res) {
    const cohorts = await cohortService.updateOne(
      { id: req.params.cohortId },
      req.body
    );
    return response.customResponse(res, 200, 'cohorts updated', cohorts);
  }

  static async delete(req, res) {
    const cohorts = await cohortService.deleteOne({ id: req.params.cohortId });
    return response.customResponse(res, 200, 'cohorts deleted', cohorts);
  }
}
export default cohortsController;
