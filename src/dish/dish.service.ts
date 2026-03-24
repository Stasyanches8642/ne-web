import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.dish.findMany({
        include: { category: true },
        skip,
        take: limit,
      }),
      this.prisma.dish.count(),
    ]);
    return { data, total };
  }

  findOne(id: number) {
    return this.prisma.dish.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  create(dto: CreateDishDto) {
    return this.prisma.dish.create({ data: dto });
  }

  update(id: number, dto: UpdateDishDto) {
    return this.prisma.dish.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.dish.delete({ where: { id } });
  }

  findAllCategories() {
    return this.prisma.category.findMany({ include: { dishes: true } });
  }
}
