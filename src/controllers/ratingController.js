/* eslint-disable no-restricted-syntax */
import Response from '../helpers/response';
import RatingService from '../services/ratingService';
import programsService from '../services/programsService';
import UserServices from '../services/userService';
import { computeAverage } from '../helpers/index';
import sendEmail from '../helpers/sendEmail';

class RatingController {
  async createRatings(req, res, next) {
    try {
      // Creates Ratings
      const { body } = req;
      const createdRating = await RatingService.createRating({
        ...body,
        program: req.traineeProgram,
      });
      const { trainee } = createdRating;
      const { firstName, email, id: traineeId } = req.traineeProfile;

      // Re-compute average rating
      const { id } = req.user;
      RatingService.computeAverage(trainee, id);

      await sendEmail('ratingCreated', { name: firstName, email, traineeId });
      if (req.round && req.round === req.numberOfTrainees) {
        return Response.customResponse(res, 201, 'Rating created', createdRating);
      }
      if (!req.round) {
        return Response.customResponse(res, 201, 'Rating created', createdRating);
      }
    } catch (error) {
      return next(error);
    }
  }

  async getAllRatings(req, res, next) {
    try {
      // Get All ratings from average_rating table
      const ratings = await RatingService.getRatings();

      return Response.customResponse(res, 200, 'Ratings retrieved successfully', ratings);
    } catch (error) {
      return next(error);
    }
  }

  async getAllEngineerRatings(req, res, next) {
    try {
      // Get All ratings from average_rating table
      const ratings = await RatingService.getAverage({});

      // console.log("ratings===>", ratings)

      return Response.customResponse(res, 200, 'Ratings retrieved successfully', ratings);
    } catch (error) {
      return next(error);
    }
  }

  async getEngineerRating(req, res, next) {
    try {
      const { id } = req.params;

      const user = await UserServices.findOneUser({ id });
      if (!user || user.role !== 'Trainee') {
        return Response.notFoundError(res, 'Invalid engineer Id passed');
      }

      // Get All ratings and average
      const ratings = await RatingService.getRatings({ trainee: id });
      const programs = (await programsService.getAll())
        .filter((program) => program.cohortId === user.dataValues.cohort)
        .map(({ dataValues: { id: pid, name, cohortId } }) => ({
          id: pid,
          name,
          cohort: cohortId,
          average: computeAverage(ratings.filter((rate) => rate.program === pid)),
        }));

      const body = {
        average: computeAverage(ratings),
        ratings,
      };

      for (const program of programs) {
        if (program.average) {
          body[`${program.name.replace(/\s/, '')}Average`] = program.average;
        }
      }

      return Response.customResponse(res, 200, 'Ratings retrieved successfully', body);
    } catch (error) {
      return next(error);
    }
  }

  async updateRating(req, res, next) {
    try {
      // Get Rating by Id
      const rating = await RatingService.getRatings({ id: req.params.id });

      if (rating.length === 0) {
        return Response.notFoundError(res, 'Invalid rating Id used');
      }

      const updatedRating = await RatingService.updateRating({ id: req.params.id }, req.body);

      const { user } = rating[0].dataValues;

      // Re-compute average rating
      const { id } = req.user;
      RatingService.computeAverage(user, id);

      return Response.customResponse(res, 200, 'Rating updated', updatedRating);
    } catch (error) {
      return next(error);
    }
  }
}

export default new RatingController();
