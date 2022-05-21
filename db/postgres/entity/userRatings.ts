import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';
import Product from './product';
import UserRatingsTypes from '../../types/userRatings.types';

@Entity()
class UserRatings implements UserRatingsTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column()
  rating: number;
}

export default UserRatings;
