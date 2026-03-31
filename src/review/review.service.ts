import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Subject } from 'rxjs';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  private reviewAddedSubject = new Subject<any>();
  reviewAdded$ = this.reviewAddedSubject.asObservable();

  findAll() {
    return this.prisma.review.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async create(
    dto: CreateReviewDto & { name?: string; [key: string]: unknown },
  ) {
    let userId = dto.userId;

    if (userId) {
      const userExists = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists)
        throw new BadRequestException(`Пользователь с ID ${userId} не найден`);
    } else {
      const guestName = (dto.name as string) || 'Гость';
      const guestEmail = `guest_${Date.now()}@blossom.local`;
      const user = await this.prisma.user.create({
        data: { name: guestName, email: guestEmail },
      });
      userId = user.id;
    }

    const review = await this.prisma.review.create({
      data: { rating: Number(dto.rating), text: dto.text || null, userId },
      include: { user: true },
    });

    this.reviewAddedSubject.next(review);
    return review;
  }

  update(id: number, dto: UpdateReviewDto) {
    return this.prisma.review.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.review.delete({ where: { id } });
  }
}
