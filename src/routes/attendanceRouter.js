/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import attendanceController from '../controllers/attendanceController';

const router = express.Router();

router.post('/new', attendanceController.createAttendance);

router.get('/', attendanceController.retrieveAllAttendances);
router.get('/users/:id', attendanceController.findAttendancesById);
router.get('/programs/:id', attendanceController.findAttendancesByProgramId);


export default router;
