import dotenv from 'dotenv';
import users from './users/users';
import rating from './ratings/rating';
import groups from './groups/groups';

dotenv.config();

const host = process.env.BASE_URL.replace('http://', '') || process.env.BASE_URL.replace('https://', '');

const paths = {
  ...users,
  ...rating,
  ...groups,

};

const config = {
  swagger: '2.0',
  info: {
    description: 'Dev Rating Manager',
    version: '1.0.0',
    title: 'Dev pulse',
  },
  host,
  basePath: '/',
  schemes: [
    'http',
    'https',
  ],
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
