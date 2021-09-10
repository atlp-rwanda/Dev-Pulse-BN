/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import Response from '../helpers/response';

const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // if jwt secret is not defined, return
    if (!process.env.JWT_SECRET) {
      return Response.authenticationError(res, 'JWT secret is not defined');
    }
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return Response.authenticationError(res, 'Invalid or expired token used');
  }
};

export default verify;
