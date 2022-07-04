import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../../../entity/category';
import { StatusCodes } from 'http-status-codes';

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = getRepository(Category).createQueryBuilder('category');
    const findCategory = await category.where('category.id=:id', { id }).getOne();
    if (!findCategory) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'there are no category with such id' });
    }
    await category.delete().where('category.id=:id', { id }).execute();
    res.status(StatusCodes.OK).json({ message: 'category has been deleted successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default deleteCategory;