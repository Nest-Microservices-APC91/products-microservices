import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto, Products } from '../common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(Products.CREATE)
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern(Products.FIND_ALL)
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern(Products.FIND_ONE)
  findOne(@Payload('id') id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern(Products.UPDATE)
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern(Products.DELETE)
  remove(@Payload('id') id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern(Products.VALIDATE_PRODUCTS)
  validateProducts(@Payload() ids: number[]) {
    return this.productsService.validateProducts(ids);
  }
}
