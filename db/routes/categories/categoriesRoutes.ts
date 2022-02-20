import * as express from 'express';
import getDataAboutCategoriesMongoDB from '../../mongoDB/controller/categories/dataAboutCategories';
import getDataAboutCategoriesPostgres from '../../postgres/controller/categories/getDataAboutCategories';

const getDataAboutCategoriesRouterForMongoDB = express.Router();
const getDataAboutCategoriesRouterForPostgres = express.Router();

getDataAboutCategoriesRouterForMongoDB.get('/categories', getDataAboutCategoriesMongoDB);
getDataAboutCategoriesRouterForPostgres.get('/categories', getDataAboutCategoriesPostgres);

export default { getDataAboutCategoriesRouterForMongoDB, getDataAboutCategoriesRouterForPostgres };
