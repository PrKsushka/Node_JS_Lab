require("dotenv").config();
const express=require("express");
const connectionToDataBase=require("./db/config/db");
const getDataAboutProducts=require("./db/routes/product/productRoutes");

const PORT=process.env.PORT;
const app=express();

connectionToDataBase();
app.use(getDataAboutProducts);



app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));