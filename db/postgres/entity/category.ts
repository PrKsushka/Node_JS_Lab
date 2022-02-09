import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import Product from './product';
import CategoryTypes from '../../types/categoryType';

@Entity()
export class Category implements CategoryTypes {
  @OneToMany(() => Product, (product) => product.categoryId)
  @PrimaryColumn()
  id: number;

  @Column()
  displayName: string;

  @Column({ type: 'date' })
  createdAt: string;
}

export default Category;
