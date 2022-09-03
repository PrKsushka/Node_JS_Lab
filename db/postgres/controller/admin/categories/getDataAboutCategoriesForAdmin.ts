import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../../../entity/category';
import { StatusCodes } from 'http-status-codes';

const getDataAboutCategoriesForAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = getRepository(Category).createQueryBuilder('category');
    const data = await category.where('category.id=:id', { id }).getOne();
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: `category with id ${id} not found` });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default getDataAboutCategoriesForAdmin;