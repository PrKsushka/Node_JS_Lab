import connectionToDataBase from "./db/config/db";
import express from "express";
import getDataAboutProductsRouter from "./db/routes/product/productRoutes";
require("dotenv").config();


const app = express();

app.use(getDataAboutProductsRouter);


app.listen(process.env.PORT, () => {
    connectionToDataBase();
    console.log(`Server is running on port ${process.env.PORT}`);
});