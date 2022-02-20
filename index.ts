import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import * as process from 'process';
import connectionToMongoDataBase from './db/mongoDB/db';
import connectionToPostgresDataBase from './db/postgres/db';
import productRoutes from './db/routes/product/productRoutes';
import categoryRoutes from './db/routes/categories/categoriesRoutes';
import logger from './logger/logger';

const app = express();
if (process.argv[2] === 'mongodb') {
  connectionToMongoDataBase();
  app.use(productRoutes.getDataAboutProductsRouterForMongoDB);
  app.use(categoryRoutes.getDataAboutCategoriesRouterForMongoDB);
} else if (process.argv[2] === 'postgres') {
  connectionToPostgresDataBase();
  app.use(productRoutes.getDataAboutProductsRouterForPostgres);
  app.use(categoryRoutes.getDataAboutCategoriesRouterForPostgres);
}
app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
