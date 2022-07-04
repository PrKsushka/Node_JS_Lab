import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../../entity/product';
import { StatusCodes } from 'http-status-codes';

const changeDataAboutAddedProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { displayName, createdAt, price, categoryId } = req.body;
    const product = getRepository(Product).createQueryBuilder('product');
    const findProduct = await product.where('product.id=:id', { id }).getOne();
    if (!findProduct) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'there are no product with such id' });
    }
    const obj: any = { displayName, createdAt, price, categoryId };
    for (let key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
    await product
      .update(Product)
      .set({
        ...obj,
      })
      .execute();
    res.status(StatusCodes.OK).json({ message: 'data updated successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default changeDataAboutAddedProduct;
