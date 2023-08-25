import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProduct, UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { GetFilterProductDto } from './dto/get-filters-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll({
    name,
    price_subunit: { gte, lte } = { gte: NaN, lte: NaN },
  }: GetFilterProductDto): Promise<Product[]> {
    const queryBuilder = this.productsRepository.createQueryBuilder('products');

    if (name !== undefined) {
      queryBuilder.where('products.name LIKE :name', { name: `%${name}%` });
    }

    if (gte > lte) throw new BadRequestException();

    if (!isNaN(gte)) {
      queryBuilder.andWhere('products.price_subunit >= :gte', { gte });
    }

    if (!isNaN(lte)) {
      queryBuilder.andWhere('products.price_subunit <= :lte', { lte });
    }

    const products = await queryBuilder.getMany();

    return products;
  }

  findOne(id: number) {
    return this.productsRepository.findOneByOrFail({ id });
  }

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  update(product: Product, updateProduct: UpdateProduct) {
    console.log('updateProduct :', updateProduct);
    return this.productsRepository.save({ ...product, ...updateProduct });
  }

  remove(product: Product) {
    return this.productsRepository.delete(product.id);
  }
}
