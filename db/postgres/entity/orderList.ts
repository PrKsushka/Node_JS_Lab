import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';
import Product from './product';
import OrderListTypes from '../../types/orderList.types';

@Entity()
class OrderList implements OrderListTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column()
  quantity: number;
}
export default OrderList;
