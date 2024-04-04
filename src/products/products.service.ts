import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    const totalPage = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPage / limit);

    return {
      data: await this.product.findMany({
        where: { available: true },
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalPage,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true },
    });

    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const { name, price, id } = updateProductDto;
    const product = await this.findOne(id);

    const newProduct = await this.product.update({
      where: { id: product.id, available: true },
      data: { name, price },
    });

    return newProduct;
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.product.update({
      where: { id: product.id },
      data: { available: false },
    });

    return `product with id: ${id} deleted successfully`;
  }

  async removeHard(id: number) {
    const product = await this.findOne(id);

    await this.product.delete({
      where: { id: product.id },
    });

    return `product with id: ${id} deleted successfully`;
  }
}
