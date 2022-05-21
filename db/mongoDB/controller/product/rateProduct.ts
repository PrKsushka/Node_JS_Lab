import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Product from '../../models/product';
import ProductsTypes from '../../../types/product.types';
import { ObjectId } from 'mongodb';

const rateProductWithMongoDB = async (req: Request | any, res: Response) => {
  try {
    const { rate } = req.body;
    const { id } = req.params;

    const findProduct = await Product.find({
      _id: new ObjectId(id),
      'ratings.userId': new ObjectId(req.user.id),
    }).lean<Array<ProductsTypes>>();
    if (findProduct[0]) {
      await Product.updateOne(
        {
          _id: id,
          'ratings.userId': new ObjectId(req.user.id),
        },
        {
          $set: {
            'ratings.$.userId': new ObjectId(req.user.id),
            'ratings.$.rating': Number(rate),
          },
        }
      );
    } else {
      await Product.updateOne(
        {
          _id: id,
        },
        {
          $push: {
            ratings: {
              userId: new ObjectId(req.user.id),
              rating: Number(rate),
            },
          },
        }
      );
    }
    const totalRating = await Product.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $group: {
          _id: '$temp',
          totalRating: {
            $sum: { $sum: '$ratings.rating' },
          },
        },
      },
    ]);
    await Product.updateOne(
      {
        _id: id,
        'ratings.userId': new ObjectId(req.user.id),
      },
      {
        totalRating: totalRating[0].totalRating,
      }
    );
    res.status(StatusCodes.OK).json({ message: 'product rated successfully' });
  } catch (e: any) {
    res.status(e.statusCode).json({ message: e.message });
  }
};
export default rateProductWithMongoDB;
