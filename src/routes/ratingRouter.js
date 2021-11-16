/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import ratingValidator from '../validation/ratingValidator';
import ratingController from '../controllers/ratingController';
import { isManager } from '../middlewares/access';
import auth from '../middlewares/auth';
import {
  traineeExists,
  traineeHasProgram,
  trainHasratingInSprint,
  isSeniorManager,
} from '../middlewares/users';
import extractTraineesRecords from '../helpers/extractTraineesRecords';
import sprintExists from '../middlewares/sprint';

const router = express.Router();

router.post(
  '/rate/',
  auth,
  ratingValidator.validateCreate,
  isManager,
  sprintExists,
  traineeExists,
  traineeHasProgram,
  trainHasratingInSprint,
  ratingController.createRatings,
);
router.post('/rate/all', auth, isManager, sprintExists, extractTraineesRecords);
router.patch('/rate/:id', auth, isManager, ratingController.updateRating);
router.get('/rate', auth, isManager, ratingController.getAllRatings);
router.get('/', auth, isManager, ratingController.getAllEngineerRatings);
router.get('/:id', auth, ratingController.getEngineerRating);
router.get('/pending/all', auth, isManager, ratingController.getpendingRatings);
router.post(
  '/approve/:id/:ratingId',
  auth,
  isManager,
  isSeniorManager,
  ratingController.approveRating,
);
router.post('/reject/:id', auth, isManager, isSeniorManager, ratingController.rejectRating);

export default router;
