import UserService from '../services/userService';
import Response from '../helpers/response';
import ratinService from '../services/ratingService';

const traineeExists = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.trainee;
    const trainee = await UserService.findOneUser({ id });
    if (!trainee || trainee.role !== 'Trainee') {
      return Response.notFoundError(res, 'trainee not found');
    }
    req.traineeProgram = trainee.program;
    req.traineeCohort = trainee.cohort;
    req.traineeProgramInfo = trainee.programInfo;
    req.traineeProfile = {
      id: trainee.id,
      firstName: trainee.firstName,
      lastName: trainee.lastName,
      email: trainee.email,
    };
    return next();
  } catch (error) {
    return Response.serverError(res, error.message);
  }
};

const traineeHasProgram = async (req, res, next) => {
  const { traineeProgramInfo } = req;
  if (traineeProgramInfo) {
    return next();
  }
  return Response.conflictError(res, 'Trainee has no program');
};

const trainHasratingInSprint = async (req, res, next) => {
  const { traineeProfile } = req;
  const { id } = traineeProfile;
  const { sprintId } = req;
  const findRateByTrainee = await ratinService.getRatingByTraineeAndSprint(id, sprintId);
  if (findRateByTrainee) {
    return Response.badRequestError(res, 'Trainee has already rated in this sprint');
  }
  return next();
};

export { traineeExists, traineeHasProgram, trainHasratingInSprint };
