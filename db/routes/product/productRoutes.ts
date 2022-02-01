import * as express from "express";

const router = express.Router();
const {getDataAboutProducts} = require("../../controller/product/dataAboutProducts");

router.get("/products", getDataAboutProducts);
module.exports = router;