const Product=require("../../models/product");
const getDataAboutProducts=async(req, res)=>{
    try{
        const products=await Product.find();
        res.json(products);
    }
    catch (e){
        res.status(500).json({message: "Err"})
    }
}

module.exports={
    getDataAboutProducts
}