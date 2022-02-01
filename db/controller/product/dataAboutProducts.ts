const Product = require("../../models/product");
import {Request, Response} from "express";

const getDataAboutProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({message: "Err"})
    }
}

module.exports = {
    getDataAboutProducts
}