import Product from '../../models/product';
import { Request, Response } from 'express';
import CustomError from '../../../customError/customError';

const getDataAboutProductsWithMongoDB = async (req: Request, res: Response, next: any) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let findOptions = {};
    let sortOptions = {};
    if (req.query.sortBy) {
      if (req.query.sortBy === 'price:asc') {
        sortOptions = {
          price: 1,
        };
      } else if (req.query.sortBy === 'price:desc') {
        sortOptions = {
          price: -1,
        };
      } else if (req.query.sortBy === 'createdAt:asc') {
        sortOptions = {
          createdAt: 1,
        };
      } else if (req.query.sortBy === 'createdAt:desc') {
        sortOptions = {
          createdAt: -1,
        };
      } else {
        throw new CustomError('Not such value');
      }
    }

    if (req.query.price) {
      let values: string | any = req.query.price;
      let arr: Array<string> = values.split(':');
      let min = null;
      let max = null;
      if (arr.length === 1) {
        min = Number(arr[0]);
        findOptions = {
          ...findOptions,
          price: { $gte: min },
        };
      }
      if (typeof Number(arr[0]) === 'number' && typeof Number(arr[1]) === 'number' && arr.length === 2) {
        min = Number(arr[0]);
        max = Number(arr[1]);
        findOptions = {
          ...findOptions,
          price: { $gte: min, $lte: max },
        };
      }
      if (arr[0] === '' && typeof Number(arr[1]) === 'number') {
        max = arr[1];
        findOptions = {
          ...findOptions,
          price: { $gte: 0, $lte: max },
        };
      }
    }
    if (req.query.minRating) {
      findOptions = {
        ...findOptions,
        totalRating: { $gte: Number(req.query.minRating) },
      };
    }
    if (req.query.displayName) {
      findOptions = {
        ...findOptions,
        $text: { $search: String(req.query.displayName) },
      };
    }

    const data = await Product.find(findOptions)
      .sort(sortOptions)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    if (data.length === 0) {
      throw new CustomError('Not found');
    }
    res.status(200).json(data);
  } catch (e: Error | any) {
    const customError = new CustomError(e.name);
    const error = customError.defineStatus();
    res.status(error.status).json({ message: error.message });
  }
};
export default getDataAboutProductsWithMongoDB;
