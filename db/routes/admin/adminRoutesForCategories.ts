import express from 'express';
import getDataAboutCategoriesForAdminPg from '../../postgres/controller/admin/categories/getDataAboutCategoriesForAdmin';
import addNewCategoryPg from '../../postgres/controller/admin/categories/addNewCategory';
import changeDataAboutAddedCategoryPg from '../../postgres/controller/admin/categories/changeDataAboutAddedCategory';
import deleteCategoryPg from '../../postgres/controller/admin/categories/deleteCategory';
import getDataAboutCategoriesForAdminMongo from '../../mongoDB/controller/admin/categories/getDataAboutCategoriesForAdmin';
import addNewCategoryMongo from '../../mongoDB/controller/admin/categories/addNewCategory';
import changeDataAboutAddedCategoryMongo from '../../mongoDB/controller/admin/categories/changeDataAboutAddedCategory';
import deleteCategoryMongo from '../../mongoDB/controller/admin/categories/deleteCategory';
import authAdmin from '../../utilsToken/checkIfAdminAuth';

const adminRoutePostgres = express.Router();
adminRoutePostgres.get('/admin/categories/:id', authAdmin, getDataAboutCategoriesForAdminPg);
adminRoutePostgres.post('/admin/categories', authAdmin, addNewCategoryPg);
adminRoutePostgres.patch('/admin/categories/:id', authAdmin, changeDataAboutAddedCategoryPg);
adminRoutePostgres.delete('/admin/categories/:id', authAdmin, deleteCategoryPg);

const adminRouteMongoDB = express.Router();
adminRouteMongoDB.get('/admin/categories/:id', authAdmin, getDataAboutCategoriesForAdminMongo);
adminRouteMongoDB.post('/admin/categories', authAdmin, addNewCategoryMongo);
adminRouteMongoDB.patch('/admin/categories/:id', authAdmin, changeDataAboutAddedCategoryMongo);
adminRouteMongoDB.delete('/admin/categories/:id', authAdmin, deleteCategoryMongo);

export default { adminRouteMongoDB, adminRoutePostgres };
