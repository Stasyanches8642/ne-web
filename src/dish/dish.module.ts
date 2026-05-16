import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DishApiController } from './dish.api.controller';
import { DishResolver } from './dish.resolver';

@Module({
  controllers: [DishController, DishApiController],
  providers: [DishService, DishResolver, PrismaService],
  exports: [DishService],
})
export class DishModule {}
