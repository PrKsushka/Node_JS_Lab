import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category';
import ProductType from '../../types/productType';

@Entity()
export class Product implements ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @ManyToOne(() => Category, (category) => category.id)
  categoryId: number;

  @Column({ type: 'date' })
  createdAt: string;

  @Column()
  totalRating: number;

  @Column()
  price: number;
}

export default Product;
