import express from 'express';
import searchRouter from './searchRouter';
import userRouter from './userRoutes';
import ratingRouter from './ratingRouter';
import groupRouter from './groupRouter';
import addEmail from './allowedEmailsRouter';
import programsRouter from './programsRouter';
import cohortsRouter from './cohortsRoute';
import attendance from './attendance';
import sessions from './sessions';
import sprints from './sprints';

const router = express.Router();

router.use('/search', searchRouter);
router.use('/users', userRouter.router);
router.use('/ratings', ratingRouter);
router.use('/users', userRouter.router);
router.use('/group', groupRouter);
router.use('/emails', addEmail);
router.use('/programs', programsRouter);
router.use('/cohorts', cohortsRouter);
router.use('/attendance', attendance);
router.use('/sessions', sessions);
router.use('/sprint', sprints);

export default router;
