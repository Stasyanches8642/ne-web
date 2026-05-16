import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('Reviews')
@Controller('api/reviews')
export class ReviewApiController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список отзывов с пагинацией' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Список отзывов' })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Res({ passthrough: true }) res: Response,
  ) {
    const allReviews = await this.reviewService.findAll();
    const total = allReviews.length;
    const totalPages = Math.ceil(total / limit);
    const items = allReviews.slice((page - 1) * limit, page * limit);

    const baseUrl = `/api/reviews`;
    const links: string[] = [];
    if (page > 1)
      links.push(`<${baseUrl}?page=${page - 1}&limit=${limit}>; rel="prev"`);
    if (page < totalPages)
      links.push(`<${baseUrl}?page=${page + 1}&limit=${limit}>; rel="next"`);
    if (links.length) res.setHeader('Link', links.join(', '));

    return res.json({ items, total, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить отзыв по id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Отзыв найден' })
  @ApiResponse({ status: 404, description: 'Отзыв не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать отзыв' })
  @ApiResponse({ status: 201, description: 'Отзыв создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить отзыв' })
  @ApiResponse({ status: 200, description: 'Отзыв обновлён' })
  @ApiResponse({ status: 404, description: 'Отзыв не найден' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить отзыв' })
  @ApiResponse({ status: 204, description: 'Отзыв удалён' })
  @ApiResponse({ status: 404, description: 'Отзыв не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.remove(id);
  }
}
