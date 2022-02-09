import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../entity/product';

const getDataAboutProductsWithPostgres = async (req: Request, res: Response) => {
  try {
    const products = await getRepository(Product);
    const data = await products.find();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Err' });
  }
};
export default getDataAboutProductsWithPostgres;
