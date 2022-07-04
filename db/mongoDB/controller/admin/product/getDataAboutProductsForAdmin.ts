import { Request, Response } from 'express';
import Product from '../../../models/product';
import { StatusCodes } from 'http-status-codes';

const getDataAboutProductsForAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Product.findOne({ _id: id });
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'There are no data with such id' });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default getDataAboutProductsForAdmin;
