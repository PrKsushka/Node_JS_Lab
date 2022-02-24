import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';
import User from '../../entity/user';
import { getRepository } from 'typeorm';
import CustomErrorTypes from '../../../customError/customError.types';

const changeDataAboutUser = async (req: Request | any, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await getRepository(User);
    const foundUser = await user.findOne({ id: req.user.id });
    if (foundUser) {
      await user.save({ ...foundUser, firstName: firstName, lastName: lastName });
    }
    res.status(200).json({ message: 'Info about user has been changed' });
  } catch (e: CustomErrorTypes | any) {
    const customError = new CustomError(e.name, e.status, e.message);
    const error = customError.values;
    res.status(error.status).json({ message: error.message });
  }
};
export default changeDataAboutUser;
