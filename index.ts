import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import * as process from 'process';
import connectionToMongoDataBase from './db/mongoDB/db';
import connectionToPostgresDataBase from './db/postgres/db';
import productRoutes from './db/routes/product/productRoutes';
import categoryRoutes from './db/routes/categories/categoriesRoutes';
import logger from './logger/logger';
import userRouter from './db/routes/user/userRoutes';
import orderListRoutes from './db/routes/orderList/orderListRoutes';
import swaggerUI from 'swagger-ui-express';
import * as swaggerDocs from './swagger/swagger.json';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

if (process.argv[2] === 'mongodb') {
  connectionToMongoDataBase();
  app.use(productRoutes.getDataAboutProductsRouterForMongoDB);
  app.use(categoryRoutes.getDataAboutCategoriesRouterForMongoDB);
  app.use(userRouter);
  app.use(orderListRoutes.orderListRoutesForMongoDB);
} else if (process.argv[2] === 'postgres') {
  connectionToPostgresDataBase();
  app.use(productRoutes.getDataAboutProductsRouterForPostgres);
  app.use(categoryRoutes.getDataAboutCategoriesRouterForPostgres);
  app.use(userRouter);
  app.use(orderListRoutes.orderListRoutesForPostgres);
}
app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
