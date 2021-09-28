import express from 'express';
import sessions from '../controllers/sessionsController';
import { isManager } from '../middlewares/access';
import Authenticate from '../middlewares/auth';
import AttendanceMiddleware from '../middlewares/attendance';

const router = express.Router();

const { isSessionAssociatedWithAttendance } = AttendanceMiddleware;
router.post('/', Authenticate, isManager, sessions.create);
router.get('/', Authenticate, isManager, sessions.getAll);
router.post(
  '/remove',
  Authenticate,
  isManager,
  isSessionAssociatedWithAttendance,
  sessions.deleteBulk,
);

export default router;
