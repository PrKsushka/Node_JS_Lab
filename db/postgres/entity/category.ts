import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';
import CategoryTypes from '../../types/category.types';

@Entity()
class Category implements CategoryTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column({ type: 'date' })
  createdAt: string;

  @OneToMany(() => Product, (product) => product.categoryId)
  products: Product[];
}

export default Category;
