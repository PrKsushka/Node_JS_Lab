import { Request, Response } from 'express';
import Category from '../../models/category';
import { ObjectId } from 'mongodb';
import CustomError from '../../../customError/customError';
import CustomErrorTypes from '../../../customError/customError.types';

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
      throw new CustomError('Not found');
    }
    if (
      (req.query.includeProducts && req.query.includeProducts !== 'true') ||
      (req.query.includeTop3Products && req.query.includeTop3Products !== 'top')
    ) {
      throw new CustomError('Not such value');
    }
    res.status(200).json(JSON.stringify(data));
  } catch (e: CustomErrorTypes | any) {
    const customError = new CustomError(e.name);
    const error = customError.defineCategoryAndProductStatus();
    res.status(error.status).json({ message: error.message });
  }
};
export default getDataAboutCategoriesMongoDB;
