import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationApiController } from './reservation.api.controller';

@Module({
  controllers: [ReservationController, ReservationApiController],
  providers: [ReservationService, PrismaService],
})
export class ReservationModule {}
