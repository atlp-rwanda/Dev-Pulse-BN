import express from 'express';
import programsController from '../controllers/programsController';
import Authenticate from '../middlewares/auth';
import { isManager } from '../middlewares/access';
import programsValidator from '../validation/programsValidator';
import cohortExists from '../middlewares/cohort';

const { isProgramValid, isIdValid, updateValidator } = programsValidator;
const {
  addProgram, getPrograms,
  removeProgram, programExists,
  updateProgram,
} = programsController;

const router = express.Router();

router.post('/', Authenticate, isManager, isProgramValid, cohortExists, addProgram);
router.get('/', Authenticate, isManager, getPrograms);
router.delete('/:program', Authenticate, isManager, isIdValid, programExists, removeProgram);
router.patch('/:program', Authenticate, isManager, isIdValid, programExists, updateValidator, updateProgram);

export default router;
