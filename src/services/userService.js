/* eslint-disable no-console */
/* eslint-disable no-useless-catch */
import Sequelize from 'sequelize';
import database from '../database/models';

const { user, group, cohort, rating, allowedEmails, program } = database;
const { Op } = Sequelize;

/** Class representing user services. */

class UserService {
  /**
   * Find all users with ratings
   * @param {object} param details of rating.
   * @returns {object} array of users with their ratings
   */
  static async findUsersRatings(param, filter = {}) {
    try {
      const users = await user.findAll({
        where: param,
        include: [
          {
            model: rating,
            as: 'ratings',
            where: filter,
          },
        ],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async findAllUsers(param) {
    try {
      const users = await user.findAll({
        where: param,
        include: [
          {
            model: cohort,
            as: 'cohortInfo',
          },
          {
            model: program,
            as: 'programInfo',
          },
        ],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async findOneUser(param) {
    try {
      const users = await user.findOne({
        where: param,
        include: [
          {
            model: cohort,
            as: 'cohortInfo',
          },
          {
            model: program,
            as: 'programInfo',
          },
        ],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates returns a user.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async find(param) {
    try {
      const users = await user.findOne({
        where: param,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async findOrCreateUser(_user) {
    try {
      const { email } = _user;
      if (email.includes('andela.com')) _user.role = 'Manager';

      const authorizedEmail = await allowedEmails.findOne({ where: { email } });

      if (authorizedEmail || email.includes('andela.com')) {
        const users = await user.findOrCreate({
          where: { googleId: _user.googleId },
          defaults: _user,
        });

        return users;
      }
      throw new Error('Email not authorized');
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async updateUser(body, param) {
    try {
      const users = await user.update(body, {
        where: param,
        returning: true,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns {*} users
   */
  static async getEngineersByManager(manager) {
    const groups = await group.findAll({
      where: { manager },
    });

    return groups;
  }

  /**
   * @returns {*} users
   */
  static async getAllTrainees() {
    // console.log("manager===>",manager)
    const engineers = await group.findAll();

    return engineers;
  }

  /**
   * Get user by id
   * @param {string}  params be checked against
   * @return {object} Oject of request if found
   */
  static async getSingleEngineer(params) {
    try {
      const user = await database.user.findOne({
        attributes: {
          exclude: ['password'],
        },
        where: params,
        include: [
          {
            model: cohort,
            as: 'cohortInfo',
          },
          {
            model: program,
            as: 'programInfo',
          },
        ],
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getTraineesById(ids) {
    try {
      const trainees = await user.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });
      return trainees;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
