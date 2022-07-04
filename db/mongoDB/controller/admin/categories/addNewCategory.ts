import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Category from '../../../models/category';

const addNewCategory = async (req: Request, res: Response) => {
  try {
    const { displayName, createdAt } = req.body;
    const findCategory = await Category.findOne({ displayName });
    if (findCategory) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'category exists' });
    }
    await Category.create({
      displayName,
      createdAt: new Date(createdAt),
    });
    res.status(StatusCodes.OK).json({ message: 'category has been created successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default addNewCategory;
