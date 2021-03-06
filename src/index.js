/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import Passport from './routes/userRoutes';
import routes from './routes/index';
import apiDoc from './swagger';

const { NODE_ENV } = process.env;
const app = express();
const { passport } = Passport;

app.enable('trust proxy');
app.use(cors());
if (NODE_ENV !== 'production') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Dev Rating Manager',
  });
});

app.use('/api/v1', routes);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(apiDoc));

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
