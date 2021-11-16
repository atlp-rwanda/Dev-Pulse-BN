import express from 'express';
import Authenticate from '../middlewares/auth';
import { isManager } from '../middlewares/access';
import validator from '../validation/cohortsValidator';
import cohortsController from '../controllers/cohortsController';

const { validateBody } = validator;
const { addCohort, getAllCohorts, getAllRatings } = cohortsController;

const router = express.Router();

router.get('/:cohortId/performance', Authenticate, isManager, getAllRatings);
router.post('/', Authenticate, isManager, validateBody, addCohort);
router.get('/', Authenticate, getAllCohorts);
router
  .route('/:cohortId', Authenticate, isManager)
  .get(cohortsController.getAllRatings)
  .patch(cohortsController.update)
  .delete(cohortsController.delete);

export default router;
