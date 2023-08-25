import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Money } from '../../../utils/money';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  @Exclude()
  priceSubunit: number;

  @Column()
  @Exclude()
  priceCurrency: string;

  @Expose()
  price() {
    return new Money(this.priceSubunit, this.priceCurrency);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_categories_category', // Make sure the name matches the join table name
    joinColumn: {
      name: 'productId', // Make sure this matches the column name in the join table
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId', // Make sure this matches the column name in the join table
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}
