import express from 'express';
import sprints from '../controllers/sprintController';
import { isManager } from '../middlewares/access';
import Authenticate from '../middlewares/auth';
import programExists from '../middlewares/programs';
import { getSprintByName } from '../middlewares/sprint';
import sprintValidator from '../validation/sprintValidator';

const { validateSprint } = sprintValidator;

const { create, getAll } = sprints;

const router = express.Router();
router.post('/', Authenticate, isManager, validateSprint, programExists, getSprintByName, create);
router.get('/', Authenticate, isManager, getAll);

export default router;
