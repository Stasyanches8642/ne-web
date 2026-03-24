import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewApiController } from './review.api.controller';

@Module({
  controllers: [ReviewController, ReviewApiController],
  providers: [ReviewService, PrismaService],
  exports: [ReviewService],
})
export class ReviewModule {}
