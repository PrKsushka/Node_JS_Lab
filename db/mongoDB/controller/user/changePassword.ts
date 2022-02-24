import { Request, Response } from 'express';
import User from '../../models/user';
import CustomError from '../../../customError/customError';
import bcrypt from 'bcrypt';
import CustomErrorTypes from '../../../customError/customError.types';

const changePassword = async (req: Request | any, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const newPassword = await bcrypt.hash(req.body.newPassword, 5);
    const match = await bcrypt.compare(req.body.oldPassword, user.password);
    if (match) {
      await User.findOneAndUpdate({ _id: req.user.id }, { password: newPassword });
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
