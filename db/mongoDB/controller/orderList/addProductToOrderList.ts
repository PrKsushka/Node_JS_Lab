import { Request, Response } from 'express';
import OrderList from '../../models/orderList';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

const addProductToOrderListMD = async (req: Request | any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const findPosition = await OrderList.findOne({ userId: new ObjectId(req.user.id), productId: new ObjectId(productId) });
    if (findPosition) {
      await findPosition.update().set({ quantity: Number(quantity) + Number(findPosition.quantity) });
      return res.status(StatusCodes.OK).json({ message: 'position updated successfully' });
    }
    await OrderList.create({
      productId: new ObjectId(productId),
      userId: new ObjectId(req.user.id),
      quantity,
    });
    res.status(StatusCodes.OK).json({ message: 'position has been added successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default addProductToOrderListMD;
