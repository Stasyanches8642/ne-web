import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { OrderApiController } from './order.api.controller';

@Module({
  controllers: [OrderController, OrderApiController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
