import express from 'express';
import Authenticate from '../middlewares/auth';
import { isManager } from '../middlewares/access';
import validator from '../validation/cohortsValidator';
import cohortsController from '../controllers/cohortsController';

const { validateBody } = validator;
const { addCohort, getAllCohorts } = cohortsController;

const router = express.Router();

router.post('/', Authenticate, isManager, validateBody, addCohort);
router.get('/', Authenticate, isManager, getAllCohorts);

export default router;
