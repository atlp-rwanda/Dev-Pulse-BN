/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import sessionController from '../controllers/sessionController';
//import { isManager } from "../middlewares/access";
//import auth from '../middlewares/auth';
const router = express.Router();

router.post('/session', sessionController.createSession);
//router.patch('/rate/:id', auth, isManager, ratingValidator.validateUpdate, ratingController.updateRating);
//router.get('/rate', auth, isManager, ratingController.getAllRatings);
//router.get('/', auth, isManager, ratingController.getAllEngineerRatings);
//router.get('/:id', auth, ratingController.getEngineerRating);


export default router;
