import * as express from 'express';
import getDataAboutProductsWithPostgres from '../../postgres/controller/product/getDataAboutProducts';
import getDataAboutProductsWithMongoDB from '../../mongoDB/controller/product/dataAboutProducts';
import rateProduct from '../../postgres/controller/product/rateProduct';
import auth from '../../utilsToken/checkIfAuth';
import rateProductWithMongoDB from '../../mongoDB/controller/product/rateProduct';

const getDataAboutProductsRouterForMongoDB = express.Router();
const getDataAboutProductsRouterForPostgres = express.Router();

getDataAboutProductsRouterForMongoDB.get('/products', getDataAboutProductsWithMongoDB);
getDataAboutProductsRouterForMongoDB.post('/products/:id/rate', auth, rateProductWithMongoDB);

getDataAboutProductsRouterForPostgres.get('/products', getDataAboutProductsWithPostgres);
getDataAboutProductsRouterForPostgres.post('/products/:id/rate', auth, rateProduct);

export default { getDataAboutProductsRouterForMongoDB, getDataAboutProductsRouterForPostgres };
