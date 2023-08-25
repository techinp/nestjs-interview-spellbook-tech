import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from '../src/modules/products/entities/product.entity';
import { User } from '../src/modules/users/entities/user.entity';
import { Category } from '../src/modules/categories/entities/category.entity';

export const dataSourceConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: `db/database_${process.env.NODE_ENV}.sqlite`,
  entities: [User, Product, Category],
  migrations: ['build/src/db/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'test',
};

export const dataSource = new DataSource(dataSourceConfig as DataSourceOptions);
