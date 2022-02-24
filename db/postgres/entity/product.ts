import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category';
import ProductType from '../../types/productType';

@Entity()
class Product implements ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @ManyToOne(() => Category, (category) => category.id)
  categoryId: Category;

  @Column({ type: 'date' })
  createdAt: string;

  @Column()
  totalRating: number;

  @Column()
  price: number;
}

export default Product;
