import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findUserReservations(id: number) {
    return this.prisma.reservation.findMany({ where: { userId: id } });
  }

  findUserOrders(id: number) {
    return this.prisma.order.findMany({
      where: { userId: id },
      include: { items: true },
    });
  }

  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
