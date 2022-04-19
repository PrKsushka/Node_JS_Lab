import { Request, Response } from 'express';
import Category from '../../entity/category';
import { Equal, getRepository } from 'typeorm';
import category from '../../entity/category';
import { StatusCodes } from 'http-status-codes';

const getDataAboutCategoriesPostgres = async (req: Request, res: Response) => {
  try {
    let findOptions = {};
    const categories = await getRepository(Category);
    if (req.query.id) {
      findOptions = {
        ...findOptions,
        where: {
          id: Equal(Number(req.query.id)),
        },
      };
      if (req.query.includeProducts === 'true') {
        findOptions = {
          ...findOptions,
          join: {
            alias: 'category',
            innerJoinAndSelect: {
              product: 'category.products',
            },
          },
        };
      }
    }
    const data = await categories.find(findOptions);
    if (req.query.includeProducts === 'true' && req.query.includeTop3Products === 'top') {
      data.forEach((el) => {
        el.products.sort((a, b) => b.totalRating - a.totalRating).splice(3, el.products.length);
      });
    }
    if (data.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Not found' });
    }
    if (
      (req.query.includeProducts && req.query.includeProducts !== 'true') ||
      (req.query.includeTop3Products && req.query.includeTop3Products !== 'top')
    ) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Not such value' });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default getDataAboutCategoriesPostgres;
