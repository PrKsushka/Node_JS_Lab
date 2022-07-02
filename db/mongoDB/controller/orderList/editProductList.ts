import { Request, Response } from 'express';
import OrderList from '../../models/orderList';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from "mongodb";

const editProductListMD = async (req: Request | any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    if (req.query.deletePositionId) {
      await OrderList.remove({ userId: new ObjectId(req.user.id), productId: new ObjectId(req.query.deletePositionId) });
      return res.status(StatusCodes.OK).json({ message: 'position deleted successfully' });
    } else {
      const findPosition = await OrderList.findOne({ userId: new ObjectId(req.user.id), productId: new ObjectId(productId) });
      if (!findPosition) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: 'Sorry, position is not find' });
      } else {
        await findPosition.update().set({ quantity });
        return res.status(StatusCodes.OK).json({ message: 'position updated successfully' });
      }
    }
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default editProductListMD;
