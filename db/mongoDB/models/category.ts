import mongoose from 'mongoose';
import CategoryTypes from '../../types/category.types';

const categorySchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});
const Category = mongoose.model<CategoryTypes>('Categories', categorySchema);
export default Category;
