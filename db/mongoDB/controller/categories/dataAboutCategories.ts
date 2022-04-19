import { Request, Response } from 'express';
import Category from '../../models/category';
import { ObjectId } from 'mongodb';
import CustomError from '../../../customError/customError';
import CustomErrorTypes from '../../../customError/customError.types';
import { StatusCodes } from 'http-status-codes';

const getDataAboutCategoriesMongoDB = async (req: Request, res: Response) => {
  try {
    let data;
    let aggregateOption: Array<any> = [{ $sort: { _id: 1 } }];
    if (req.query.id) {
      aggregateOption = [
        ...aggregateOption,
        {
          $match: {
            _id: new ObjectId(String(req.query.id)),
          },
        },
      ];
      if (req.query.includeProducts === 'true') {
        aggregateOption = [
          ...aggregateOption,
          {
            $lookup: {
              from: 'products',
              localField: '_id',
              foreignField: 'categoryId',
              as: 'products',
            },
          },
        ];
      }
      if (req.query.includeProducts === 'true' && req.query.includeTop3Products === 'top') {
        aggregateOption = [
          ...aggregateOption,
          {
            $lookup: {
              from: 'products',
              as: 'products',
              let: { categoryId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$categoryId', '$$categoryId'] },
                  },
                },
                {
                  $sort: {
                    totalRating: -1,
                  },
                },
                {
                  $limit: 3,
                },
              ],
            },
          },
        ];
      }
    }

    data = await Category.aggregate(aggregateOption);
    if (data.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Not found' });
    }
    if (
      (req.query.includeProducts && req.query.includeProducts !== 'true') ||
      (req.query.includeTop3Products && req.query.includeTop3Products !== 'top')
    ) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Not such value' });
    }
    res.status(StatusCodes.OK).json(JSON.stringify(data));
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default getDataAboutCategoriesMongoDB;
