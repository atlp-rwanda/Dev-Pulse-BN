import dotenv from 'dotenv';
import users from './users/users';
import rating from './ratings/rating';
import groups from './groups/groups';
import allowedEmails from './emails/allowedEmails';
import cohorts from './cohorts/cohort';
import programs from './programs/programs';

dotenv.config();

const host =
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL.split('https://')[1]
    : process.env.BASE_URL.split('http://')[1];

const paths = {
  ...users,
  ...rating,
  ...groups,
  ...allowedEmails,
  ...cohorts,
  ...programs,
};

const config = {
  swagger: '2.0',
  info: {
    description: 'Dev Rating Manager',
    version: '1.0.0',
    title: 'Dev pulse',
  },
  host,
  basePath: '/api/v1/',
  schemes: ['http', 'https'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  tags: [
    { name: 'Users', description: 'Every thing About users' },
    { name: 'Rating', description: 'All about rating a trainee/Engineer' },
  ],
  paths,
};
export default config;