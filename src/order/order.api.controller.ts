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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Orders')
@Controller('api/orders')
export class OrderApiController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список заказов с пагинацией' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Список заказов' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res({ passthrough: true }) res: Response,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const all = await this.orderService.findAll();
    const total = all.length;
    const data = all.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    const baseUrl = '/api/orders';
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
  @ApiOperation({ summary: 'Получить заказ по ID' })
  @ApiParam({ name: 'id', description: 'ID заказа' })
  @ApiResponse({ status: 200, description: 'Заказ найден' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(id);
    if (!order) throw new NotFoundException(`Заказ с ID ${id} не найден`);
    return order;
  }

  @Get(':id/items')
  @ApiOperation({ summary: 'Получить позиции заказа' })
  @ApiParam({ name: 'id', description: 'ID заказа' })
  @ApiResponse({ status: 200, description: 'Позиции заказа' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async findOrderItems(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(id);
    if (!order) throw new NotFoundException(`Заказ с ID ${id} не найден`);
    return order;
  }

  @Post()
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({ status: 201, description: 'Заказ создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить заказ по ID' })
  @ApiParam({ name: 'id', description: 'ID заказа' })
  @ApiResponse({ status: 200, description: 'Заказ обновлён' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ) {
    const order = await this.orderService.findOne(id);
    if (!order) throw new NotFoundException(`Заказ с ID ${id} не найден`);
    return this.orderService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить заказ по ID' })
  @ApiParam({ name: 'id', description: 'ID заказа' })
  @ApiResponse({ status: 204, description: 'Заказ удалён' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(id);
    if (!order) throw new NotFoundException(`Заказ с ID ${id} не найден`);
    return this.orderService.remove(id);
  }
}
