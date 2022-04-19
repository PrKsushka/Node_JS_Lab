import { Request, Response } from 'express';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

const changePassword = async (req: Request | any, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const newPassword = await bcrypt.hash(req.body.newPassword, 5);
    const match = await bcrypt.compare(req.body.oldPassword, user.password);
    if (match) {
      await User.findOneAndUpdate({ _id: req.user.id }, { password: newPassword });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Password is not correct' });
    }
    res.status(StatusCodes.OK).json({ message: 'Password has been changed' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default changePassword;
