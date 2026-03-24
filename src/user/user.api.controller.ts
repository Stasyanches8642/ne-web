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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('api/users')
export class UserApiController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список пользователей с пагинацией' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Список пользователей' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const all = await this.userService.findAll();
    const total = all.length;
    const data = all.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    const baseUrl = '/api/users';
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
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    return user;
  }

  @Get(':id/reservations')
  @ApiOperation({ summary: 'Получить бронирования пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Бронирования пользователя' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async findUserReservations(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    return this.userService.findUserReservations(id);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Получить заказы пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Заказы пользователя' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async findUserOrders(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    return this.userService.findUserOrders(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь обновлён' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 204, description: 'Пользователь удалён' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    return this.userService.remove(id);
  }
}
