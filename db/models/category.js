const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    displayName: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    }
});
const Category=mongoose.model("category", categorySchema);
module.exports=Category;