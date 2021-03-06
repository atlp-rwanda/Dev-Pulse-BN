/* eslint-disable no-restricted-globals */
import Sequelize from 'sequelize';
import Response from '../helpers/response';
import UserService from '../services/userService';

const { Op } = Sequelize;

const {
  findAllUsers,
  getEngineersByManager,
  getSingleEngineer,
  updateUser,
  findOneUser,
  getAllTraineeRatings,
} = UserService;

/**
 * @class AuthController
 * @classdesc AuthController
 */
class UserController {
  /**
   * Login Callback method.
   * @function loginCallback
   * @param {Object} req request Object.
   * @param {Object} res response Object.
   * @returns {Object} response Object.
   */
  static async updateRole(req, res) {
    try {
      if (req.user.role !== 'Manager') {
        return Response.authorizationError(res, 'You do not have access to perform this action');
      }
      const { email } = req.body;
      const check = await UserService.findOneUser({ email });
      if (!check) return Response.notFoundError(res, 'User not found');
      if (check.role === 'Manager') {
        return Response.badRequestError(res, 'The user is already an LF');
      }
      const user = await UserService.updateUser({ role: 'LF' }, { email });
      return Response.customResponse(res, 200, 'Successfully updated the user to LF', user[1][0]);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return Response.validationError(res, error.errors[0].message);
      }
      return Response.serverError(res, error);
    }
  }

  static async viewAllProfiles(req, res) {
    let engineerIds;
    let allUsers;
    // if (req.user.role !== 'Manager') return Response.authorizationError(res, 'You do not have access to perform this action');

    // console.log("id ===>", req.user.id)
    const results = await getEngineersByManager(req.user.id);
    // console.log("Engineers===>", results)

    // if there is engineers

    if (results[0]) {
      engineerIds = results[0].dataValues.engineers;
      if (engineerIds[0]) {
        allUsers = await findAllUsers({
          id: { [Op.or]: engineerIds },
          role: 'Trainee',
        });
      }

      return Response.customResponse(res, 200, 'success', allUsers);
    }

    return Response.badRequestError(res, 'No engineers found');
  }

  static async getAllUsers(req, res, next) {
    // console.log("getting all userrs=====<><><====")
    try {
      // if (req.user.role === 'Trainee') return Response.authorizationError(res, 'You do not have access to perform this action');
      // if there is engineers
      const results = await UserService.findAllUsers({});
      // console.log('results=======>',results)

      return Response.customResponse(res, 200, 'success', results);
    } catch (error) {
      return next(error);
    }
  }

  static async viewSingleProfile(req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id, 10))) {
      Response.badRequestError(res, 'enter a valid user id');
    }

    if (req.user.role === 'Trainee' && parseInt(id, 10) !== req.user.id) {
      return Response.authorizationError(res, "Don't  have previelage to access this end point");
    }

    const user = await getSingleEngineer({ id });

    if (!user) Response.notFoundError(res, 'User not found');

    return Response.customResponse(res, 200, 'User found successfully', user);
  }

  static async getMyProfile(req, res) {
    const user = await getSingleEngineer({ id: req.user.id });
    const isSenior = user.role.split('_').includes('Senior');
    if (isSenior) {
      user.role = 'Manager';
    }
    if (!user) Response.notFoundError(res, 'User not found');

    const seniors = process.env.SENIOR_MANAGERS;
    const seniorList = seniors ? seniors.split(',') : [];
    const isLead = seniorList.includes(user.email);

    return Response.customResponse(res, 200, 'Profile retrieved successfully', { ...user.toJSON(), isLead });
  }

  static async changeCohort(req, res) {
    try {
      const { id, cohort } = req.params;
      await updateUser({ cohort }, { id });
      await updateUser({ program: null }, { id });
      return Response.customResponse(res, 200, "trainee's cohort changed!");
    } catch (error) {
      return Response.serverError(res, error.message);
    }
  }

  static async changeProgram(req, res) {
    try {
      const { id, program } = req.params;
      await updateUser({ program }, { id });
      return Response.customResponse(res, 200, "trainee's program changed!");
    } catch (error) {
      return Response.serverError(res, error.message);
    }
  }

  static async exportTraineesRatings(req, res, next) {
    try {
      const { id } = req.params;
      const { from, to } = req.query;

      const user = await findOneUser({ id });
      if (!user || user.role !== 'Trainee') {
        return Response.notFoundError(res, 'Trainee not found or not a trainee');
      }

      const ratings = await getAllTraineeRatings(id, from, to);

      const body = {
        ratings,
      };

      return Response.customResponse(res, 200, 'Ratings retrieved successfully', body);
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
