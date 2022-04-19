import { Request, Response } from 'express';
import { Between, getRepository, ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import Product from '../../entity/product';
import { StatusCodes } from 'http-status-codes';

const getDataAboutProductsWithPostgres = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let option = {};
    if (req.query.sortBy) {
      if (req.query.sortBy === 'price:asc') {
        option = {
          ...option,
          order: {
            price: 'ASC',
          },
        };
      } else if (req.query.sortBy === 'price:desc') {
        option = {
          ...option,
          order: {
            price: 'DESC',
          },
        };
      } else if (req.query.sortBy === 'createdAt:asc') {
        option = {
          ...option,
          order: {
            createdAt: 'ASC',
          },
        };
      } else if (req.query.sortBy === 'createdAt:desc') {
        option = {
          ...option,
          order: {
            createdAt: 'DESC',
          },
        };
      } else {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Not such value' });
      }
    }

    if (req.query.price) {
      const values: string | any = req.query.price;
      const arr: Array<string> = values.split(':');
      let min = null;
      let max = null;
      if (arr.length === 1) {
        min = Number(arr[0]);
        option = {
          ...option,
          where: {
            price: MoreThanOrEqual(min),
          },
        };
      }
      if (typeof Number(arr[0]) === 'number' && typeof Number(arr[1]) === 'number' && arr.length === 2) {
        min = Number(arr[0]);
        max = Number(arr[1]);
        option = {
          ...option,
          where: {
            price: Between(min, max),
          },
        };
      }
      if (arr[0] === '' && typeof Number(arr[1]) === 'number') {
        max = arr[1];
        option = {
          ...option,
          where: {
            price: LessThanOrEqual(max),
          },
        };
      }
    }
    if (req.query.minRating) {
      option = {
        where: {
          totalRating: MoreThanOrEqual(Number(req.query.minRating)),
        },
      };
    }
    if (req.query.displayName) {
      option = {
        where: {
          displayName: ILike(`%${req.query.displayName}%`),
        },
      };
    }

    const products = await getRepository(Product);
    const data = await products.find({ ...option, skip: (Number(page) - 1) * Number(limit), take: Number(limit) });
    if (data.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Not found' });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default getDataAboutProductsWithPostgres;
