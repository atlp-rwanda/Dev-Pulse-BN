import express from 'express';
import attendanceController from '../controllers/attendanceController';
import { isManager } from '../middlewares/access';
import auth from '../middlewares/auth';
import attendance from '../middlewares/attendance';
import { traineeExists } from '../middlewares/users';
const router = express.Router();
const { create, getAll,getTraineesAttendance,getAttendanceByProgram } = attendanceController;
const { allTraineesExists } = attendance;

router.post('/', auth, isManager,allTraineesExists,create);
router.get('/', auth,getAll);
router.get('/users/:id', auth, traineeExists, getTraineesAttendance);
router.get('/program/:id', auth,isManager,getAttendanceByProgram);

export default router;
