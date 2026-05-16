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
  NotFoundException,
  Res,
  UseInterceptors,
  Header,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@ApiTags('Dishes')
@Controller('api/dishes')
export class DishApiController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @Header('Cache-Control', 'public, max-age=3600')
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.dishService.findAll(page, limit);
    const totalPages = Math.ceil(result.total / limit);
    const baseUrl = `/api/dishes`;

    const links: string[] = [];
    if (page > 1)
      links.push(`<${baseUrl}?page=${page - 1}&limit=${limit}>; rel="prev"`);
    if (page < totalPages)
      links.push(`<${baseUrl}?page=${page + 1}&limit=${limit}>; rel="next"`);
    if (links.length) res.setHeader('Link', links.join(', '));

    return result;
  }

  @Get('categories')
  @UseInterceptors(CacheInterceptor)
  @Header('Cache-Control', 'public, max-age=3600')
  @ApiOperation({ summary: 'Получить все категории с блюдами' })
  @ApiResponse({ status: 200, description: 'Список категорий' })
  findAllCategories() {
    return this.dishService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить блюдо по id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Блюдо найдено' })
  @ApiResponse({ status: 404, description: 'Блюдо не найдено' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const dish = await this.dishService.findOne(id);
    if (!dish) throw new NotFoundException(`Блюдо с ID ${id} не найдено`);
    return dish;
  }

  @Post()
  @ApiOperation({ summary: 'Создать блюдо' })
  @ApiResponse({ status: 201, description: 'Блюдо создано' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() dto: CreateDishDto) {
    return this.dishService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить блюдо' })
  @ApiResponse({ status: 200, description: 'Блюдо обновлено' })
  @ApiResponse({ status: 404, description: 'Блюдо не найдено' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDishDto,
  ) {
    const dish = await this.dishService.findOne(id);
    if (!dish) throw new NotFoundException(`Блюдо с ID ${id} не найдено`);
    return this.dishService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить блюдо' })
  @ApiResponse({ status: 204, description: 'Блюдо удалено' })
  @ApiResponse({ status: 404, description: 'Блюдо не найдено' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const dish = await this.dishService.findOne(id);
    if (!dish) throw new NotFoundException(`Блюдо с ID ${id} не найдено`);
    return this.dishService.remove(id);
  }
}
