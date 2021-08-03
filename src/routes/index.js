import express from 'express';
import searchRouter from './searchRouter';
import userRouter from './userRoutes';
import ratingRouter from './ratingRouter';
import groupRouter from './groupRouter';
import addEmail from './allowedEmailsRouter';
import programsRouter from './programsRouter';
import cohortsRouter from './cohortsRoute';

const router = express.Router();

router.use('/search', searchRouter);
router.use('/users', userRouter.router);
router.use('/ratings', ratingRouter);
router.use('/users', userRouter.router);
router.use('/group', groupRouter);
router.use('/emails', addEmail);
router.use('/programs', programsRouter);
router.use('/cohorts', cohortsRouter);

export default router;
