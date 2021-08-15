/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import ratingValidator from '../validation/ratingValidator';
import ratingController from '../controllers/ratingController';
import { isManager } from '../middlewares/access';
import auth from '../middlewares/auth';
import { traineeExists } from '../middlewares/users';

const router = express.Router();

router.post('/rate/', auth, ratingValidator.validateCreate, isManager, traineeExists, ratingController.createRatings);
router.patch('/rate/:id', auth, isManager, ratingValidator.validateUpdate, ratingController.updateRating);
router.get('/rate', auth, isManager, ratingController.getAllRatings);
router.get('/', auth, isManager, ratingController.getAllEngineerRatings);
router.get('/:id', auth, ratingController.getEngineerRating);

export default router;
