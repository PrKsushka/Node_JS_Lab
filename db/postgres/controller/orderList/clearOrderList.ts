import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import OrderList from '../../entity/orderList';
import { StatusCodes } from 'http-status-codes';

const clearOrderList = async (req: Request | any, res: Response) => {
  try {
    await getRepository(OrderList).createQueryBuilder('order_list').delete().where('"order_list"."userId"=:id', { id: req.user.id }).execute();
    res.status(StatusCodes.OK).json({ message: 'order list is empty' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default clearOrderList;
