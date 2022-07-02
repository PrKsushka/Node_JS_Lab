import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import OrderList from '../../entity/orderList';
import { StatusCodes } from 'http-status-codes';

const editProductList = async (req: Request | any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const orderList = await getRepository(OrderList).createQueryBuilder('order_list');

    if (req.query.deletePositionId) {
      await orderList
        .delete()
        .where('"order_list"."userId"=:userId', { userId: req.user.id })
        .andWhere('"order_list"."productId"=:productId', { productId: req.query.req.query.deletePositionId })
        .execute();
      return res.status(StatusCodes.OK).json({ message: 'position deleted successfully' });
    } else {
      const findPosition = await orderList
        .where('"order_list"."userId"=:userId', { userId: req.user.id })
        .andWhere('"order_list"."productId"=:productId', { productId })
        .getOne();
      if (!findPosition) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: 'Sorry, position is not find' });
      }
      await orderList.update(OrderList).set({ quantity }).execute();
      return res.status(StatusCodes.OK).json({ message: 'position updated successfully' });
    }
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default editProductList;
