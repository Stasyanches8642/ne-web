import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.reservation.findMany({ include: { user: true } });
  }

  findOne(id: number) {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  create(dto: CreateReservationDto) {
    return this.prisma.reservation.create({ data: dto });
  }

  update(id: number, dto: UpdateReservationDto) {
    return this.prisma.reservation.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.reservation.delete({ where: { id } });
  }
}
