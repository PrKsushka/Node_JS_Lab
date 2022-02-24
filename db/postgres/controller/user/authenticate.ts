import { Request, Response } from 'express';
import User from '../../entity/user';
import CustomError from '../../../customError/customError';
import bcrypt from 'bcrypt';
import TokenService from '../../../utilsToken/tokenService';
import { getRepository } from 'typeorm';
import CustomErrorTypes from '../../../customError/customError.types';

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await getRepository(User);
    const foundUser = await user.findOne({ username: username });
    if (!foundUser) {
      throw new CustomError('err', 404, 'Sorry, user is not find');
    }
    const comparePassword = bcrypt.compareSync(password, foundUser.password);
    if (!comparePassword) {
      throw new CustomError('err', 500, 'Wrong password!');
    }
    const token = TokenService.generateToken(foundUser.id, foundUser.username, foundUser.role);
    const refreshToken = TokenService.refreshToken(foundUser.id, foundUser.username, foundUser.role);
    res.status(200).json({ token, refreshToken });
  } catch (e: CustomErrorTypes | any) {
    const customError = new CustomError(e.name, e.status, e.message);
    const error = customError.values;
    res.status(error.status).json({ message: error.message });
  }
};
export default authenticate;
