import express from 'express';
import getDataAboutProductsForAdminPg from '../../postgres/controller/admin/product/getDataAboutProductsForAdmin';
import addNewProductPg from '../../postgres/controller/admin/product/addNewProduct';
import changeDataAboutAddedProductPg from '../../postgres/controller/admin/product/changeDataAboutAddedProduct';
import deleteProductPg from '../../postgres/controller/admin/product/deleteProduct';
import getDataAboutProductsForAdminMongo from '../../mongoDB/controller/admin/product/getDataAboutProductsForAdmin';
import addNewProductMongo from '../../mongoDB/controller/admin/product/addNewProduct';
import changeDataAboutAddedProductMongo from '../../mongoDB/controller/admin/product/changeDataAboutAddedProduct';
import deleteProductMongo from '../../mongoDB/controller/admin/product/deleteProduct';
import authAdmin from '../../utilsToken/checkIfAdminAuth';

const adminRoutePostgres = express.Router();
adminRoutePostgres.get('/admin/products/:id', authAdmin, getDataAboutProductsForAdminPg);
adminRoutePostgres.post('/admin/products', authAdmin, addNewProductPg);
adminRoutePostgres.patch('/admin/products/:id', authAdmin, changeDataAboutAddedProductPg);
adminRoutePostgres.delete('/admin/products/:id', authAdmin, deleteProductPg);

const adminRouteMongoDB = express.Router();
adminRouteMongoDB.get('/admin/products/:id', authAdmin, getDataAboutProductsForAdminMongo);
adminRouteMongoDB.post('/admin/products', authAdmin, addNewProductMongo);
adminRouteMongoDB.patch('/admin/products/:id', authAdmin, changeDataAboutAddedProductMongo);
adminRouteMongoDB.delete('/admin/products/:id', authAdmin, deleteProductMongo);

export default { adminRouteMongoDB, adminRoutePostgres };
