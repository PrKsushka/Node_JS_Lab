import { Request, Response } from 'express';
import Category from '../../models/category';
import { ObjectId } from 'mongodb';

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
    res.status(200).json(JSON.stringify(data));
  } catch (e) {
    res.status(500).json({ message: 'Err' });
  }
};
export default getDataAboutCategoriesMongoDB;
