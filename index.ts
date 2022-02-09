import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import * as process from 'process';
import connectionToMongoDataBase from './db/mongoDB/db';
import connectionToPostgresDataBase from './db/postgres/db';
import productRoutes from './db/routes/product/productRoutes';

const app = express();
if (process.argv[2] === 'mongodb') {
  connectionToMongoDataBase();
  app.use(productRoutes.getDataAboutProductsRouterForMongoDB);
} else if (process.argv[2] === 'postgres') {
  connectionToPostgresDataBase();
  app.use(productRoutes.getDataAboutProductsRouterForPostgres);
}
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
