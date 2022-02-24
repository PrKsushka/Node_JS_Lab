import jwt from 'jsonwebtoken';
import CustomError from '../customError/customError';
import { NextFunction, Request, Response } from 'express';

function auth(req: Request | any, res: Response, next: NextFunction) {
  let token = req.headers['authorization'];
  token = token.split(' ')[1];
  jwt.verify(token, 'access', (err: any, user: any) => {
    if (!err) {
      req.user = user;
      next();
    } else {
      const customError = CustomError.unauthorizedRequest('User is not authenticated');
      const error = customError.values;
      return res.status(error.status).json({ message: error.message });
    }
  });
}

export default auth;
