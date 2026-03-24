import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DishApiController } from './dish.api.controller';

@Module({
  controllers: [DishController, DishApiController],
  providers: [DishService, PrismaService],
  exports: [DishService],
})
export class DishModule {}
