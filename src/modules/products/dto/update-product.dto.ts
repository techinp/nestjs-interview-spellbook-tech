import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsArray, IsInt, IsOptional } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsArray()
  categories: number[]; // An array of category IDs
}

export class UpdateProduct extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsArray()
  categories: Category[]; // An array of category IDs
}
