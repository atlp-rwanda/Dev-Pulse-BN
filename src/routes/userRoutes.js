import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import programsController from '../controllers/programsController';
import Authenticate from '../middlewares/auth';
import { isManager } from '../middlewares/access';
import { traineeExists } from '../middlewares/users';
import cohortExists from '../middlewares/cohort';

const {
  viewAllProfiles,
  getAllUsers,
  viewSingleProfile,
  getMyProfile,
  changeCohort,
  changeProgram,
  exportTraineesRatings,
} = UserController;
const { programExists } = programsController;
const router = express.Router();
const { loginCallback } = AuthController;
const { updateRole } = UserController;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/api/v1/users/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profileFields: ['emails', 'firstName', 'lastName'],
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
      };
      return done(null, user);
    }
  )
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  loginCallback
);

router.patch('/make-lf', Authenticate, isManager, updateRole);

router.get('/all', Authenticate, isManager, getAllUsers);
router.get('/', Authenticate, viewAllProfiles);
router.get('/my-profile', Authenticate, getMyProfile);
router.get('/:id', Authenticate, viewSingleProfile);
router.put(
  '/:id/cohort/:cohort',
  Authenticate,
  isManager,
  traineeExists,
  cohortExists,
  changeCohort
);
router.put(
  '/:id/program/:program',
  Authenticate,
  isManager,
  traineeExists,
  programExists,
  changeProgram
);
router.get('/:id/ratings', Authenticate, isManager, exportTraineesRatings);

export default { router, passport };
