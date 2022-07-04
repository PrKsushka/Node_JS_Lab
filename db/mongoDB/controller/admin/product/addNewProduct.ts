import { Request, Response } from 'express';
import Product from '../../../models/product';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const { displayName, createdAt, price, categoryId } = req.body;
    const findProduct = await Product.findOne({ displayName });
    if (findProduct) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'product exists' });
    }
    await Product.create({
      displayName,
      createdAt: new Date(createdAt),
      totalRating: 0,
      price,
      categoryId: new ObjectId(categoryId),
    });
    res.status(StatusCodes.OK).json({ message: 'product has been created successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default addNewProduct;
