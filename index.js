require("dotenv").config();
const express = require("express");
const connectionToDataBase = require("./db/config/db");
const getDataAboutProducts = require("./db/routes/product/productRoutes");


const app = express();

app.use(getDataAboutProducts);


app.listen(process.env.PORT, () => {
    connectionToDataBase();
    console.log(`Server is running on port ${process.env.PORT}`);
});