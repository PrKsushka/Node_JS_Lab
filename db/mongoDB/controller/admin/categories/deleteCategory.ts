import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Category from '../../../models/category';

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findCategory = await Category.findOne({ _id: id });
    if (!findCategory) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: `there are no category with id ${id} ` });
    }
    await Category.deleteOne({ _id: id });
    res.status(StatusCodes.OK).json({ message: 'category has been deleted successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default deleteCategory;
