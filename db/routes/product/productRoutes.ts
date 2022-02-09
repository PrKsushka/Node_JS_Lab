import * as express from 'express';
import getDataAboutProductsWithPostgres from '../../postgres/controller/product/getDataAboutProducts';
import getDataAboutProductsWithMongoDB from '../../mongoDB/controller/product/dataAboutProducts';

const getDataAboutProductsRouterForMongoDB = express.Router();
const getDataAboutProductsRouterForPostgres = express.Router();

getDataAboutProductsRouterForMongoDB.get('/products', getDataAboutProductsWithMongoDB);
getDataAboutProductsRouterForPostgres.get('/products', getDataAboutProductsWithPostgres);
export default { getDataAboutProductsRouterForMongoDB, getDataAboutProductsRouterForPostgres };
