import Product from '../../models/product';
import { Request, Response } from 'express';

const getDataAboutProductsWithMongoDB = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ message: 'Err' });
  }
};
export default getDataAboutProductsWithMongoDB;
