import mongoose from "mongoose";

interface CategoryTypes extends mongoose.Document {
    displayName: string;
    createdAt: Date;
}

const categorySchema = new mongoose.Schema({
    displayName: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    }
});
const Category = mongoose.model<CategoryTypes>("Category", categorySchema);
export default Category;