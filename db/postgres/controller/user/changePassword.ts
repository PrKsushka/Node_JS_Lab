import { Request, Response } from 'express';
import User from '../../entity/user';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

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
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Password is not correct' });
    }
    res.status(StatusCodes.OK).json({ message: 'Password has been changing' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default changePassword;
