import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import User from '../../entity/user';
import bcrypt from 'bcrypt';
import TokenService from '../../../utilsToken/tokenService';
import { getRepository } from 'typeorm';
import CustomErrorTypes from '../../../customError/customError.types';

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    if (!username || !password) {
      throw new CustomError('err', 404, 'Not valid');
    }
    const user = await getRepository(User);
    const foundUser = await user.findOne({ username: req.body.username });
    if (foundUser) {
      throw new CustomError('err', 500, 'Such user is');
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = await user.create({
      username: username,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
    });
    await user.save(newUser);
    const token = TokenService.generateToken(newUser.id, newUser.username, newUser.role);
    const refreshToken = TokenService.refreshToken(newUser.id, newUser.username, newUser.role);
    res.status(200).json({ token, refreshToken });
  } catch (e: CustomErrorTypes | any) {
    const customError = new CustomError(e.name, e.status, e.message);
    const error = customError.values;
    res.status(error.status).json({ message: error.message });
  }
};
export default register;
