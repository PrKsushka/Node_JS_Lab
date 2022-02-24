import { Request, Response } from 'express';
import User from '../../models/user';
import CustomError from '../../../customError/customError';
import bcrypt from 'bcrypt';
import TokenService from '../../../utilsToken/tokenService';
import CustomErrorTypes from '../../../customError/customError.types';

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new CustomError('err', 404, 'Sorry, user is not find');
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new CustomError('err', 500, 'Wrong password!');
    }
    const token = TokenService.generateToken(user.id, user.username, user.role);
    const refreshToken = TokenService.refreshToken(user.id, user.username, user.role);
    res.status(200).json({ token, refreshToken });
  } catch (e: CustomErrorTypes | any) {
    const customError = new CustomError(e.name, e.status, e.message);
    const error = customError.values;
    res.status(error.status).json({ message: error.message });
  }
};
export default authenticate;
