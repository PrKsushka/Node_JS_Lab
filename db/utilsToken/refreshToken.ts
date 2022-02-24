import { Request, Response } from 'express';
import CustomError from '../customError/customError';
import jwt from 'jsonwebtoken';
import TokenService from './tokenService';
import CustomErrorTypes from '../customError/customError.types';

const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      throw CustomError.forbiddenRequest('User is not authenticated');
    }
    jwt.verify(refreshToken, 'refresh', (err: any, user: any) => {
      if (!err) {
        const accessToken = TokenService.generateToken(user.id, user.username, user.role);
        return res.status(200).json(accessToken);
      } else {
        throw CustomError.forbiddenRequest('User not authenticated');
      }
    });
  } catch (e: CustomErrorTypes | any) {
    const customError = new CustomError(e.name, e.status, e.message);
    const error = customError.values;
    res.status(error.status).json({ message: error.message });
  }
};
export default refreshToken;
