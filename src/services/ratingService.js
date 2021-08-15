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
      console.log('error', rating);
      throw error;
    }
  }

  static async getRatings(param) {
    console.log('param', param);
    try {
      const ratings = await Rating.findAll({
        where: param,
        include: [{
          model: database.program,
          as: 'programInfo',
          include: [{
            model: database.cohort,
          }],
        }],
      });
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
      console.log('RatingService 1');
      const allRatings = await RatingService.getRatings({ trainee });
      console.log('RatingService 2');

      // Compute Average of all ratings of a user
      const average_rating = computeAverage(allRatings);

      console.log('average_rating', average_rating);

      // Update the average ratings Table
      await RatingService.updateAverage({ trainee }, submitter, average_rating);
      console.log('Done average_rating');
    } catch (error) {
      throw error;
    }
  }

  static async getAverage(param) {
    console.log('param ', param);
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

      console.log('average', average);
      return average;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateAverage(trainee, submitter, rating) {
    console.log('trainee   ====>', trainee);
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
}

export default RatingService;
