import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Category from '../../../models/category';

const changeDataAboutAddedCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { displayName, createdAt } = req.body;
    const findCategory = await Category.findOne({ _id: id });
    if (!findCategory) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'there are no category with such id' });
    }
    await Category.updateOne({ _id: id }, { displayName, createdAt: new Date(createdAt) });
    res.status(StatusCodes.OK).json({ message: 'category has been updated successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default changeDataAboutAddedCategory;
