import { Request, Response } from 'express';
import User from '../../entity/user';
import bcrypt from 'bcrypt';
import TokenService from '../../../utilsToken/tokenService';
import { getRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    if (!username || !password) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Not valid' });
    }
    const user = await getRepository(User);
    const foundUser = await user.findOne({ username: req.body.username });
    if (foundUser) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Such user is' });
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = await user.create({
      username,
      password: hashPassword,
      firstName,
      lastName,
    });
    await user.save(newUser);
    const token = TokenService.generateToken(newUser.id, newUser.username, newUser.role);
    const refreshToken = TokenService.refreshToken(newUser.id, newUser.username, newUser.role);
    res.status(StatusCodes.OK).json({ token, refreshToken });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default register;
