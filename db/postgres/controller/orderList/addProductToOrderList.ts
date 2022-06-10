import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import OrderList from '../../entity/orderList';
import { StatusCodes } from 'http-status-codes';

const addProductToOrderList = async (req: Request | any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const orderList = getRepository(OrderList).createQueryBuilder('order_list');
    const findPosition = await orderList
      .where('"order_list"."userId"=:userId', { userId: req.user.id })
      .andWhere('"order_list"."productId"=:productId', { productId })
      .getOne();
    if (findPosition) {
      await orderList
        .update(OrderList)
        .set({ quantity: Number(findPosition.quantity) + Number(quantity) })
        .execute();
      return res.status(StatusCodes.OK).json({ message: 'position updated successfully' });
    }
    await getRepository(OrderList)
      .createQueryBuilder()
      .insert()
      .into(OrderList)
      .values({
        userId: req.user.id,
        productId,
        quantity,
      })
      .execute();
    res.status(StatusCodes.OK).json({ message: 'position has been added successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default addProductToOrderList;
