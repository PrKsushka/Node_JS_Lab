import { Request, Response } from 'express';
import Category from '../../../models/category';
import { StatusCodes } from 'http-status-codes';

const getDataAboutCategoriesForAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Category.findOne({ _id: id });
    if (!data) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'there are no category with such id' });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default getDataAboutCategoriesForAdmin;