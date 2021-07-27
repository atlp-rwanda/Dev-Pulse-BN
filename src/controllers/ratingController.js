import Response from '../helpers/response';
import RatingService from '../services/ratingService';
import UserServices from '../services/userService';

import { computeAverage } from '../helpers/index';

class RatingController {
  async createRatings(req, res, next) {
    console.log('ratingggggg');
    try {
      // Creates Ratings
      const createdRating = await RatingService.createRating(req.body);
      const { trainee } = createdRating;

      console.log('Step 1 User', trainee);

      // Re-compute average rating
      const { id } = req.user;
      RatingService.computeAverage(trainee, id);

      return Response.customResponse(res, 201, 'Rating created', createdRating);
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
    console.log('fetching .... ratings..');
    try {
      const { id } = req.params;

      // Check if Correct User Id Passed
      const user = await UserServices.findOneUser({ id });

      console.log('user fetched', user);

      if (!user || user.role !== 'Trainee') return Response.notFoundError(res, 'Invalid engineer Id passed');
      // Get All ratings
      const ratings = await RatingService.getRatings({ trainee: id });

      // Get Average rating from average_rating Table
      const average = await RatingService.getAverage({ trainee: id });

      return Response.customResponse(res, 200, 'Ratings retrieved successfully', { average, ratings });
    } catch (error) {
      return next(error);
    }
  }

  async updateRating(req, res, next) {
    try {
      // Get Rating by Id
      const rating = await RatingService.getRatings({ id: req.params.id });

      if (rating.length === 0) return Response.notFoundError(res, 'Invalid rating Id used');

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
