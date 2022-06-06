import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import UserRatings from '../../entity/userRatings';
import Product from '../../entity/product';
import { StatusCodes } from 'http-status-codes';

const rateProduct = async (req: Request | any, res: Response) => {
  try {
    const { rate } = req.body;
    const { id } = req.params;
    const userRatings = await getRepository(UserRatings).createQueryBuilder('user_ratings');

    if (Number(rate) >= 1 && Number(rate) <= 10) {
      const findIfRated = await userRatings
        .where('user_ratings."productId"=:productId', { productId: Number(id) })
        .andWhere('user_ratings."userId"=:userId', { userId: Number(req.user.id) })
        .getOne();

      if (findIfRated) {
        await userRatings
          .update(UserRatings)
          .set({ rating: Number(rate) })
          .where('user_ratings."userId"=:id', { id: req.user.id })
          .andWhere('user_ratings."productId"=:id', { id })
          .execute();
      } else {
        await userRatings
          .insert()
          .into(UserRatings)
          .values({ user: req.user.id, product: id, rating: Number(rate) })
          .execute();
      }

      const products = await getRepository(Product).createQueryBuilder('product');
      const currentProduct = await products.where('product.id=:id', { id }).getOne();
      if (currentProduct) {
        const sum = await getRepository(UserRatings).createQueryBuilder().select('SUM(rating)', 'sum').where('"productId"=:id', { id }).getRawOne();
        await products
          .update(Product)
          .set({ totalRating: Number(sum.sum) })
          .where('product.id=:id', { id })
          .execute();
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Rate should be 1-10' });
    }
    res.status(StatusCodes.OK).json({ message: 'product successfully rated' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default rateProduct;
