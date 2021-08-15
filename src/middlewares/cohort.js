import cohortService from '../services/cohortService';
import Response from '../helpers/response';

const cohortExists = async (req, res, next) => {
  try {
    const cohort = req.params.cohort || req.body.cohortId;
    const getCohort = await cohortService.findOne({ id: cohort });
    if (!getCohort) {
      return Response.notFoundError(res, 'cohort not found');
    }
    return next();
  } catch (error) {
    return Response.serverError(res, error.message);
  }
};

export default cohortExists;
