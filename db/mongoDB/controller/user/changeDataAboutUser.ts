import { Request, Response } from 'express';
import User from '../../models/user';
import { StatusCodes } from 'http-status-codes';

const changeDataAboutUser = async (req: Request | any, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    await User.findOneAndUpdate({ _id: req.user.id }, { firstName: firstName, lastName: lastName });
    res.status(StatusCodes.OK).json({ message: 'Info about user has been changing' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default changeDataAboutUser;
