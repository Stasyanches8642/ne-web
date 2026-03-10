import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DishController],
  providers: [DishService, PrismaService],
  exports: [DishService],
})
export class DishModule {}
