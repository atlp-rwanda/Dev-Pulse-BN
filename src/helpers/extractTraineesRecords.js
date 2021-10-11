/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import ratingController from '../controllers/ratingController';
import UserService from '../services/userService';
import Response from './response';

const { createRatings } = ratingController;

const extractTraineesRecords = async (req, res, next) => {
  // get an an array of trainees that are going to be rated with their ratings
  const getVAlues = Object.values(req.body);

  /*
  variable which will increment if any trainee is rated
  this  will be used to check if all trainees are rated
      */
  let round = 0;

  // get number on trainees that are going to be rated
  const numberOfTrainees = getVAlues.length;

  for (const value of getVAlues) {
    req.body = value;
    req.round = round;
    req.numberOfTrainees = numberOfTrainees;
    const id = value.trainee;
    const trainee = await UserService.findOneUser({ id });
    if (!trainee || trainee.role !== 'Trainee') {
      return Response.notFoundError(res, 'One or more trainee(s) not found');
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
    await createRatings(req, res, next);
    round += 1;
  }
};

export default extractTraineesRecords;
