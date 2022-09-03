import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category';
import ProductType from '../../types/product.types';

@Entity()
class Product implements ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'date' })
  createdAt: string;

  @Column()
  totalRating: number;

  @Column()
  price: number;
}

export default Product;
