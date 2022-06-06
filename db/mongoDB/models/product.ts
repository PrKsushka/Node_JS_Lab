import mongoose from 'mongoose';
import ProductsTypes from '../../types/product.types';

const productSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
  createdAt: {
    type: Date,
    required: true,
  },
  totalRating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratings: [
    {
      userId: {
        ref: 'User',
        type: mongoose.Types.ObjectId,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
});
productSchema.index({ displayName: 'text' });
const Product = mongoose.model<ProductsTypes>('Products', productSchema);
export default Product;
