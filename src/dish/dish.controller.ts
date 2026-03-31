import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Redirect,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  @Render('catalog')
  async getCatalogPage() {
    const categories = await this.dishService.findAllCategories();
    return { pageStyle: 'catalog', activePage: 'catalog', categories };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(+id);
  }

  @Post()
  @Redirect('/dish')
  async create(@Body() dto: CreateDishDto) {
    await this.dishService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDishDto) {
    return this.dishService.update(+id, dto);
  }

  @Delete(':id')
  @Redirect('/dish')
  async remove(@Param('id') id: string) {
    await this.dishService.remove(+id);
  }
}
