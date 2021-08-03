import UserService from '../services/userService';
import Response from '../helpers/response';

const traineeExists = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.trainee;
    const trainee = await UserService.findOneUser({ id });
    if (!trainee || trainee.role !== 'Trainee') {
      return Response.notFoundError(res, 'trainee not found');
    }
    req.traineeProgram = trainee.program;
    req.traineeCohort = trainee.cohort;
    return next();
  } catch (error) {
    return Response.serverError(res, error.message);
  }
};

export { traineeExists };