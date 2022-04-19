import { Request, Response } from 'express';
import User from '../../entity/user';
import CustomError from '../../../customError/customError';
import bcrypt from 'bcrypt';
import TokenService from '../../../utilsToken/tokenService';
import { getRepository } from 'typeorm';
import CustomErrorTypes from '../../../customError/customError.types';
import { StatusCodes } from 'http-status-codes';

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await getRepository(User);
    const foundUser = await user.findOne({ username: username });
    if (!foundUser) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Sorry, user is not find' });
    }
    const comparePassword = bcrypt.compareSync(password, foundUser.password);
    if (!comparePassword) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Wrong password!' });
    }
    const token = TokenService.generateToken(foundUser.id, foundUser.username, foundUser.role);
    const refreshToken = TokenService.refreshToken(foundUser.id, foundUser.username, foundUser.role);
    res.status(StatusCodes.OK).json({ token, refreshToken });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default authenticate;
