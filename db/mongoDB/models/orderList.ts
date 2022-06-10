import mongoose from 'mongoose';
import OrderListTypes from '../../types/orderList.types';

const orderListSchema = new mongoose.Schema({
  userId: {
    ref: 'User',
    type: mongoose.Types.ObjectId,
  },
  productId: {
    ref: 'Products',
    type: mongoose.Types.ObjectId,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const OrderList = mongoose.model<OrderListTypes>('OrderLists', orderListSchema);
export default OrderList;
