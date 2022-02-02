import mongoose from 'mongoose';

interface ProductsTypes extends mongoose.Document {
  displayName: string;
  categoryId: number;
  createdAt: Date;
  totalRating: number;
  price: number;
}

const productSchema = new mongoose.Schema({
  displayName: {
    type: String,
    require: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  createdAt: {
    type: Date,
    require: true,
  },
  totalRating: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});
const Product = mongoose.model<ProductsTypes>('Products', productSchema);
export default Product;
