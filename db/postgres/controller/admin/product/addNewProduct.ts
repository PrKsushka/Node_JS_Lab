import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../../entity/product';
import { StatusCodes } from 'http-status-codes';

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const { displayName, createdAt, price, categoryId } = req.body;
    const product = getRepository(Product).createQueryBuilder('product');
    const findProduct = await product.where('"product"."displayName"=:name', { name: displayName }).getOne();
    if (findProduct) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'product exists' });
    }
    await product
      .insert()
      .into(Product)
      .values({ displayName, createdAt, totalRating: 0, price: Number(price), categoryId: Number(categoryId) })
      .execute();
    res.status(StatusCodes.OK).json({ message: 'new product has been created successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default addNewProduct;
