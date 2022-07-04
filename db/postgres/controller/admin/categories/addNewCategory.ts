import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../../../entity/category';
import { StatusCodes } from 'http-status-codes';

const addNewCategory = async (req: Request, res: Response) => {
  try {
    const { displayName, createdAt } = req.body;
    const category = getRepository(Category).createQueryBuilder('category');
    const findCategory = await category.where('"category"."displayName"=:name', { name: displayName }).getOne();
    if (findCategory) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'category exists' });
    }
    await category
      .insert()
      .into(Category)
      .values({
        displayName,
        createdAt,
      })
      .execute();
    res.status(StatusCodes.OK).json({ message: 'category has been created successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default addNewCategory;
