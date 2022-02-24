import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import User from '../../models/user';
import CustomErrorTypes from '../../../customError/customError.types';

const changeDataAboutUser = async (req: Request | any, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    await User.findOneAndUpdate({ _id: req.user.id }, { firstName: firstName, lastName: lastName });
    res.status(200).json({ message: 'Info about user has been changed' });
  } catch (e: CustomErrorTypes | any) {
    const customError = new CustomError(e.name, e.status, e.message);
    const error = customError.values;
    res.status(error.status).json({ message: error.message });
  }
};
export default changeDataAboutUser;
