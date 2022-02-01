const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    displayName: {
        type: String,
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        require: true
    },
    totalRating: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});
const Product=mongoose.model("Products", productSchema);
module.exports=Product;