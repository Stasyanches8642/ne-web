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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@ApiTags('Reservations')
@Controller('api/reservations')
export class ReservationApiController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список бронирований с пагинацией' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Список бронирований' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const all = await this.reservationService.findAll();
    const total = all.length;
    const data = all.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    const baseUrl = '/api/reservations';
    const links: string[] = [];
    if (pageNum > 1)
      links.push(
        `<${baseUrl}?page=${pageNum - 1}&limit=${limitNum}>; rel="prev"`,
      );
    if (pageNum * limitNum < total)
      links.push(
        `<${baseUrl}?page=${pageNum + 1}&limit=${limitNum}>; rel="next"`,
      );

    if (links.length) res.setHeader('Link', links.join(', '));
    return res.json({ data, total, page: pageNum, limit: limitNum });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить бронирование по ID' })
  @ApiParam({ name: 'id', description: 'ID бронирования' })
  @ApiResponse({ status: 200, description: 'Бронирование найдено' })
  @ApiResponse({ status: 404, description: 'Бронирование не найдено' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const reservation = await this.reservationService.findOne(id);
    if (!reservation)
      throw new NotFoundException(`Бронирование с ID ${id} не найдено`);
    return reservation;
  }

  @Post()
  @ApiOperation({ summary: 'Создать бронирование' })
  @ApiResponse({ status: 201, description: 'Бронирование создано' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить бронирование по ID' })
  @ApiParam({ name: 'id', description: 'ID бронирования' })
  @ApiResponse({ status: 200, description: 'Бронирование обновлено' })
  @ApiResponse({ status: 404, description: 'Бронирование не найдено' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationDto,
  ) {
    const reservation = await this.reservationService.findOne(id);
    if (!reservation)
      throw new NotFoundException(`Бронирование с ID ${id} не найдено`);
    return this.reservationService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить бронирование по ID' })
  @ApiParam({ name: 'id', description: 'ID бронирования' })
  @ApiResponse({ status: 204, description: 'Бронирование удалено' })
  @ApiResponse({ status: 404, description: 'Бронирование не найдено' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const reservation = await this.reservationService.findOne(id);
    if (!reservation)
      throw new NotFoundException(`Бронирование с ID ${id} не найдено`);
    return this.reservationService.remove(id);
  }
}
