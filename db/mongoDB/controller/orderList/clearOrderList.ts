import { Request, Response } from 'express';
import OrderList from '../../models/orderList';
import { StatusCodes } from 'http-status-codes';

const clearOrderListMD = async (req: Request | any, res: Response) => {
  try {
    await OrderList.remove({
      userId: req.user.id,
    });
    res.status(StatusCodes.OK).json({ message: 'order list is empty' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default clearOrderListMD;
