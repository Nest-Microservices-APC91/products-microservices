import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto, ProductTCP } from '../common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(ProductTCP.CREATE)
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern(ProductTCP.FIND_ALL)
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern(ProductTCP.FIND_ONE)
  findOne(@Payload('id') id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern(ProductTCP.UPDATE)
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern(ProductTCP.DELETE)
  remove(@Payload('id') id: number) {
    return this.productsService.remove(id);
  }
}
