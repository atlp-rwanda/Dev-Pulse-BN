import express from 'express';
import programsController from '../controllers/programsController';
import Authenticate from '../middlewares/auth';
import { isManager } from '../middlewares/access';
import programsValidator from '../validation/programsValidator';
import cohortExists from '../middlewares/cohort';

const { isProgramValid, updateValidator } = programsValidator;
const { addProgram, getPrograms, removeProgram, updateProgram } =
  programsController;

const router = express.Router();

router.post(
  '/',
  Authenticate,
  isManager,
  isProgramValid,
  cohortExists,
  addProgram
);
router.get('/', Authenticate, getPrograms);
router.delete('/:program', Authenticate, isManager, removeProgram);
router.patch(
  '/:program',
  Authenticate,
  isManager,
  updateValidator,
  updateProgram
);

export default router;
