import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../../entity/product';
import { StatusCodes } from 'http-status-codes';

const getDataAboutProductsForAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getRepository(Product).createQueryBuilder('product').where('product.id=:id', { id }).getOne();
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: `product with id ${id} not found` });
    }
    res.status(200).json(data);
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default getDataAboutProductsForAdmin;
