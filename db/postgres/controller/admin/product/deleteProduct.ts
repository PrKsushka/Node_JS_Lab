import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../../entity/product';
import { StatusCodes } from 'http-status-codes';

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = getRepository(Product).createQueryBuilder('product');
    const findProduct = await product.where('product.id=:id', { id }).getOne();
    if (!findProduct) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'there are no product with such id' });
    }
    await product.delete().where('product.id=:id', { id }).execute();
    res.status(StatusCodes.OK).json({ message: 'product has been deleted successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default deleteProduct;
