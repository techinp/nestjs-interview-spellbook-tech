import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: 'product_categories_category', // Make sure the name matches the join table name
    joinColumn: {
      name: 'categoryId', // Make sure this matches the column name in the join table
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId', // Make sure this matches the column name in the join table
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  // ... other fields, getters, setters, etc.
}
