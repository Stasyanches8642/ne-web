import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Redirect,
  Sse,
  Render,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { map } from 'rxjs';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Sse('reviews/events')
  reviewEvents() {
    return this.reviewService.reviewAdded$.pipe(
      map((review) => ({ data: JSON.stringify(review) })),
    );
  }

  @Get('reviews')
  @Render('reviews')
  async getReviewsPage() {
    const reviews = await this.reviewService.findAll();
    return { pageStyle: 'reviews', activePage: 'reviews', reviews };
  }

  @Get('reviews/add')
  @Render('review-add')
  getAddReviewPage() {
    return { pageStyle: 'reviews', activePage: 'reviews' };
  }

  @Get('reviews/:id/edit')
  @Render('review-edit')
  async getEditReviewPage(@Param('id') id: string) {
    const review = await this.reviewService.findOne(+id);
    return { pageStyle: 'reviews', activePage: 'reviews', review };
  }

  @Post('review')
  @Redirect('/reviews')
  async create(@Body() dto: CreateReviewDto) {
    await this.reviewService.create(dto);
  }

  @Post('review/:id/update')
  @Redirect('/reviews')
  async update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    await this.reviewService.update(+id, dto);
  }

  @Post('review/:id/delete')
  @Redirect('/reviews')
  async remove(@Param('id') id: string) {
    await this.reviewService.remove(+id);
  }

  @Get('review')
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('review/:id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch('review/:id')
  updateApi(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(+id, dto);
  }

  @Delete('review/:id')
  @Redirect('/reviews')
  async removeApi(@Param('id') id: string) {
    await this.reviewService.remove(+id);
  }
}
