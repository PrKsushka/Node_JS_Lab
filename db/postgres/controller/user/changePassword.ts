import { Request, Response } from 'express';
import User from '../../entity/user';
import CustomError from '../../../customError/customError';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import CustomErrorTypes from '../../../customError/customError.types';

const changePassword = async (req: Request | any, res: Response) => {
  try {
    let match;
    const user = await getRepository(User);
    const foundUser = await user.findOne({ id: req.user.id });
    const newPassword = await bcrypt.hash(req.body.newPassword, 5);
    if (foundUser) {
      match = await bcrypt.compare(req.body.oldPassword, foundUser.password);
    }
    if (match) {
      await user.save({ ...foundUser, password: newPassword });
    } else {
      throw CustomError.unauthorizedRequest('Password is not correct');
    }
    res.status(200).json({ message: 'Password has been changed' });
  } catch (e: CustomErrorTypes | any) {
    const customError = new CustomError(e.name, e.status, e.message);
    const error = customError.values;
    res.status(error.status).json({ message: error.message });
  }
};
export default changePassword;
