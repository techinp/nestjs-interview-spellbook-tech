import { async } from 'rxjs';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCategories1692988000879 implements MigrationInterface {
  name = 'CreateCategories1692988000879';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "category" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "name" varchar NOT NULL
      )
    `);

    // Create Many-to-Many Relationship Table
    await queryRunner.createTable(
      new Table({
        name: 'product_categories_category',
        columns: [
          {
            name: 'productId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'categoryId',
            type: 'integer',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Create Foreign Keys
    await queryRunner.createForeignKey(
      'product_categories_category',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_categories_category',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.dropTable('product_categories_category');
  }
}
