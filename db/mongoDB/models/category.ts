import mongoose from 'mongoose';
import CategoryTypes from '../../types/categoryType';

const categorySchema = new mongoose.Schema({
  displayName: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
});
const Category = mongoose.model<CategoryTypes>('Category', categorySchema);
export default Category;
