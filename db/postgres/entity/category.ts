import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import Product from './product';
import CategoryTypes from '../../types/categoryType';

@Entity()
export class Category implements CategoryTypes {
  @PrimaryColumn()
  id: number;

  @Column()
  displayName: string;

  @Column({ type: 'date' })
  createdAt: string;

  @OneToMany(() => Product, (product) => product.categoryId)
  products: Product[];
}

export default Category;
