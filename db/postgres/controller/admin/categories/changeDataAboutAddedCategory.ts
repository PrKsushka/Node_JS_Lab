import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../../../entity/category';
import { StatusCodes } from 'http-status-codes';

const changeDataAboutAddedCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { displayName, createdAt } = req.body;
    const category = getRepository(Category).createQueryBuilder('category');
    const findCategory = await category.where('category.id=:id', { id }).getOne();
    if (!findCategory) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'there are no category with such id' });
    }
    const obj: any = { displayName, createdAt };
    for (let key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
    await category
      .update(Category)
      .set({ ...obj })
      .execute();
    res.status(StatusCodes.OK).json({ message: 'category has been updated successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default changeDataAboutAddedCategory;
