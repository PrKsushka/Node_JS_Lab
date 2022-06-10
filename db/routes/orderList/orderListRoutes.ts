import express from 'express';
import auth from '../../utilsToken/checkIfAuth';
import addProductToOrderList from '../../postgres/controller/orderList/addProductToOrderList';
import editProductList from '../../postgres/controller/orderList/editProductList';
import clearOrderList from '../../postgres/controller/orderList/clearOrderList';
import addProductToOrderListMD from '../../mongoDB/controller/orderList/addProductToOrderList';
import editProductListMD from '../../mongoDB/controller/orderList/editProductList';
import clearOrderListMD from '../../mongoDB/controller/orderList/clearOrderList';

const orderListRoutesForPostgres = express.Router();
orderListRoutesForPostgres.post('/order-list', auth, addProductToOrderList);
orderListRoutesForPostgres.put('/order-list', auth, editProductList);
orderListRoutesForPostgres.post('/order-list/clear', auth, clearOrderList);

const orderListRoutesForMongoDB = express.Router();
orderListRoutesForMongoDB.post('/order-list', auth, addProductToOrderListMD);
orderListRoutesForMongoDB.put('/order-list', auth, editProductListMD);
orderListRoutesForMongoDB.post('/order-list/clear', auth, clearOrderListMD);

export default { orderListRoutesForMongoDB, orderListRoutesForPostgres };
