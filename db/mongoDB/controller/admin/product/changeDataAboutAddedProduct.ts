import { Request, Response } from 'express';
import Product from '../../../models/product';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

const changeDataAboutAddedProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { displayName, createdAt, price, categoryId } = req.body;
    const findProduct = await Product.findOne({ _id: id });
    if (!findProduct) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'there are no product with such id' });
    }
    await Product.updateOne({ _id: id }, { displayName, createdAt: new Date(createdAt), price, categoryId: new ObjectId(categoryId) });
    res.status(StatusCodes.OK).json({ message: 'product has been updated successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default changeDataAboutAddedProduct;
