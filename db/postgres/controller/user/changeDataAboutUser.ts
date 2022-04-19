import { Request, Response } from 'express';
import User from '../../entity/user';
import { getRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

const changeDataAboutUser = async (req: Request | any, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await getRepository(User);
    const foundUser = await user.findOne({ id: req.user.id });
    if (foundUser) {
      await user.save({ ...foundUser, firstName: firstName, lastName: lastName });
    }
    res.status(StatusCodes.OK).json({ message: 'Info about user has been changing' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default changeDataAboutUser;
