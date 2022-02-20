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
const Category = mongoose.model<CategoryTypes>('Categories', categorySchema);
export default Category;
