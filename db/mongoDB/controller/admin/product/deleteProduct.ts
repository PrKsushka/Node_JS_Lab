import { Request, Response } from 'express';
import Product from '../../../models/product';
import { StatusCodes } from 'http-status-codes';

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findOne({ _id: id });
    if (!findProduct) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: `there are no product with id ${id} ` });
    }
    await Product.deleteOne({ _id: id });
    res.status(StatusCodes.OK).json({ message: 'product has been deleted successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default deleteProduct;