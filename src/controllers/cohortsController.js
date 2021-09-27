/* eslint-disable class-methods-use-this */
import { Op } from 'sequelize';
import response from '../helpers/response';
import cohortService from '../services/cohortService';
import userService from '../services/userService';

class cohortsController {
  static async addCohort(req, res) {
    try {
      const cohort = await cohortService.addCohort(req.body);
      return response.customResponse(res, 201, 'cohort added ', cohort);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  static async getAllRatings(req, res) {
    try {
      const { from, to } = req.query;
      let dateFilter = {};
      if (from || to) {
        const start = new Date(decodeURI(from));
        let end = new Date(Date.now());
        if (to) end = new Date(decodeURI(to));
        dateFilter = {
          createdAt: {
            [Op.between]: [start, end],
          },
        };
      }

      const users = await userService.findUsersRatings(
        { cohort: req.params.cohortId },
        dateFilter
      );

      return response.customResponse(
        res,
        200,
        'Cohort ratings retrieved',
        users
          .map((user) => user.ratings)
          .reduce((prev, curr) => prev.concat(curr), [])
      );
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
    if (!cohorts.deleted)
      return response.customResponse(res, 400, cohorts.error, null);
    return response.customResponse(
      res,
      200,
      'cohorts deleted',
      cohorts.deleted
    );
  }
}
export default cohortsController;
