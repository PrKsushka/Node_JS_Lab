import { Request, Response } from 'express';
import Category from '../../entity/category';
import { Equal, getRepository } from 'typeorm';
import category from '../../entity/category';
import CustomError from '../../../customError/customError';

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
    let data = await categories.find(findOptions);
    if (req.query.includeProducts === 'true' && req.query.includeTop3Products === 'top') {
      data.forEach((el) => {
        el.products.sort((a, b) => b.totalRating - a.totalRating).splice(3, el.products.length);
      });
    }
    if (data.length === 0) {
      throw new CustomError('Not found');
    }
    if (
      (req.query.includeProducts && req.query.includeProducts !== 'true') ||
      (req.query.includeTop3Products && req.query.includeTop3Products !== 'top')
    ) {
      throw new CustomError('Not such value');
    }
    res.status(200).json(data);
  } catch (e: any) {
    const customError = new CustomError(e.name);
    const error = customError.defineStatus();
    res.status(error.status).json({ message: error.message });
  }
};
export default getDataAboutCategoriesPostgres;
