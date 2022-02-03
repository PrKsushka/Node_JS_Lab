import * as express from 'express';
import getDataAboutProducts from '../../controller/product/dataAboutProducts';

const getDataAboutProductsRouter = express.Router();
getDataAboutProductsRouter.get('/products', getDataAboutProducts);
export default getDataAboutProductsRouter;
