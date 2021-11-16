/* eslint-disable no-useless-catch */
import database from '../database/models';
import { computeAverage } from '../helpers/index';

const Rating = database.rating;

const AverageRatings = database.averageRating;
const User = database.user;
class RatingService {
  static async createRating(rating) {
    try {
      const ratings = await Rating.create(rating);
      return ratings;
    } catch (error) {
      throw error;
    }
  }

  static async getRatings(param) {
    try {
      const ratings = await Rating.findAll({
        where: param,
        include: [
          {
            model: database.program,
            as: 'programInfo',
            include: [
              {
                model: database.cohort,
              },
            ],
          },
          {
            model: database.sprint,
            as: 'sprintInfo',
          },
        ],
      });
      console.log('\n\n\n\n\n\n\n\n', ratings);
      return ratings;
    } catch (error) {
      throw error;
    }
  }

  static async updateRating(id, rating) {
    try {
      const updatedRating = await Rating.update(rating, {
        returning: true,
        where: id,
      });

      return updatedRating;
    } catch (error) {
      throw error;
    }
  }

  static async computeAverage(trainee, submitter) {
    try {
      const allRatings = await RatingService.getRatings({ trainee });

      // Compute Average of all ratings of a user
      const average_rating = computeAverage(allRatings);

      // Update the average ratings Table
      await RatingService.updateAverage({ trainee }, submitter, average_rating);
    } catch (error) {
      throw error;
    }
  }

  static async getAverage(param) {
    try {
      const average = await AverageRatings.findAll({
        where: param,
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email', 'cohort', 'program'],
          },
        ],
      });
      return average;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateAverage(trainee, submitter, rating) {
    try {
      const found_average = await AverageRatings.findAll({ where: trainee });

      if (found_average.length != 0) {
        const average = await AverageRatings.update(rating, {
          returning: true,
          where: trainee,
        });

        return average;
      }

      rating.trainee = trainee.trainee;

      rating.submitter = submitter;
      const average = await AverageRatings.create(rating);

      return average;
    } catch (error) {
      throw error;
    }
  }

  static async getRatingByTraineeAndSprint(trainee, sprintId) {
    try {
      const rating = await Rating.findOne({
        where: { trainee, sprintId },
      });
      return rating;
    } catch (error) {
      throw error;
    }
  }

  static async getRatingById(id) {
    try {
      const rating = await Rating.findOne({
        where: { id },
      });
      return rating;
    } catch (error) {
      throw error;
    }
  }
}

export default RatingService;
