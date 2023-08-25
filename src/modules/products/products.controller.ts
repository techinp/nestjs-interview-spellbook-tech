import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto, UpdateProduct } from './dto/update-product.dto';
import { GetFilterProductDto } from './dto/get-filters-product.dto';
import { CategoriesService } from '../categories/categories.service';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  /*
   * TODO: Add ability to filter by name to this controller action.
   * TODO: Add ability to filter by price to this controller action. Support "greater than or equal" and "lesser than or equal".
   *
   * Example: /products?name=Something&price_subunit[gte]=10&price_subunit[lte]=100
   */

  @Get()
  getProductByFilter(@Query() query: GetFilterProductDto) {
    return this.productsService.findAll(query);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  /*
   * TODO: Add the Category entity and create a Many-To-Many association to Products.
   * TODO: Add ability to link Products to Categories.
   */

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.findOne(id);
    const categories = await this.categoriesService.findItemsByIds(
      updateProductDto.categories,
    );
    console.log('categories :', categories);

    const updateProduct: UpdateProduct = {
      ...updateProductDto,
      categories,
    };

    return this.productsService.update(product, updateProduct);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);

    return this.productsService.remove(product);
  }
}
