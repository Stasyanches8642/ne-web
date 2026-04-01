import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DishService } from './dish.service';
import {
  DishType,
  DishListType,
  CategoryType,
} from './graphql/dish.graphql.types';
import { CreateDishInput, UpdateDishInput } from '../graphql/graphql.inputs';

@Resolver(() => DishType)
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Query(() => DishListType, {
    description: 'Получить список всех блюд с пагинацией',
  })
  async dishes(
    @Args('page', {
      type: () => Int,
      defaultValue: 1,
      description: 'Номер страницы',
    })
    page: number,
    @Args('limit', {
      type: () => Int,
      defaultValue: 10,
      description: 'Количество на странице',
    })
    limit: number,
  ) {
    const result = await this.dishService.findAll(page, limit);
    return { ...result, page, limit };
  }

  @Query(() => DishType, {
    nullable: true,
    description: 'Получить блюдо по ID',
  })
  async dish(
    @Args('id', { type: () => Int, description: 'ID блюда' }) id: number,
  ) {
    return this.dishService.findOne(id);
  }

  @Query(() => [CategoryType], { description: 'Получить все категории блюд' })
  async categories() {
    return this.dishService.findAllCategories();
  }

  @Mutation(() => DishType, { description: 'Добавить новое блюдо в меню' })
  async addDish(@Args('input') input: CreateDishInput) {
    return this.dishService.create(input);
  }

  @Mutation(() => DishType, { description: 'Обновить информацию о блюде' })
  async updateDish(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDishInput,
  ) {
    return this.dishService.update(id, input);
  }

  @Mutation(() => Boolean, { description: 'Убрать блюдо из меню' })
  async hideDish(@Args('id', { type: () => Int }) id: number) {
    await this.dishService.update(id, { isAvailable: false });
    return true;
  }

  @Mutation(() => Boolean, { description: 'Сделать блюдо доступным' })
  async showDish(@Args('id', { type: () => Int }) id: number) {
    await this.dishService.update(id, { isAvailable: true });
    return true;
  }

  @Mutation(() => Boolean, { description: 'Удалить блюдо' })
  async deleteDish(@Args('id', { type: () => Int }) id: number) {
    await this.dishService.remove(id);
    return true;
  }

  @ResolveField(() => CategoryType, {
    nullable: true,
    description: 'Категория блюда',
    complexity: 1,
  })
  async category(@Parent() dish: DishType) {
    if (dish.category) return dish.category;
    const full = await this.dishService.findOne(dish.id);
    return full?.category ?? null;
  }
}
