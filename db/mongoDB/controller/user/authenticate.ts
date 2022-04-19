import { Request, Response } from 'express';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import TokenService from '../../../utilsToken/tokenService';
import { StatusCodes } from 'http-status-codes';

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Sorry, user is not find' });
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Wrong password!' });
    }
    const token = TokenService.generateToken(user.id, user.username, user.role);
    const refreshToken = TokenService.refreshToken(user.id, user.username, user.role);
    res.status(StatusCodes.OK).json({ token, refreshToken });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default authenticate;
