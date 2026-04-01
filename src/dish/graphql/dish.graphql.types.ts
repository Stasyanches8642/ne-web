import { Field, Int, ObjectType, Float } from '@nestjs/graphql';

@ObjectType({ description: 'Категория блюд' })
export class CategoryType {
  @Field(() => Int, { description: 'ID категории' })
  id: number;

  @Field({ description: 'Название категории' })
  name: string;

  @Field({ nullable: true, description: 'Описание категории' })
  description?: string;
}

@ObjectType({ description: 'Блюдо в меню ресторана' })
export class DishType {
  @Field(() => Int, { description: 'ID блюда' })
  id: number;

  @Field({ description: 'Название блюда' })
  name: string;

  @Field({ nullable: true, description: 'Описание блюда' })
  description?: string;

  @Field(() => Float, { description: 'Цена в рублях' })
  price: number;

  @Field({ nullable: true, description: 'Состав блюда' })
  ingredients?: string;

  @Field({ description: 'Подходит ли для вегетарианцев' })
  isVegetarian: boolean;

  @Field({ nullable: true, description: 'URL изображения' })
  imageUrl?: string;

  @Field({ description: 'Доступно ли блюдо' })
  isAvailable: boolean;

  @Field(() => Int, { nullable: true, description: 'Вес в граммах' })
  weight?: number;

  @Field(() => Int, { nullable: true, description: 'Калорийность' })
  calories?: number;

  @Field(() => Int, { description: 'ID категории' })
  categoryId: number;

  @Field(() => CategoryType, { nullable: true, description: 'Категория блюда' })
  category?: CategoryType;
}

@ObjectType({ description: 'Список блюд с пагинацией' })
export class DishListType {
  @Field(() => [DishType], { description: 'Список блюд' })
  data: DishType[];

  @Field(() => Int, { description: 'Общее количество блюд' })
  total: number;

  @Field(() => Int, { description: 'Текущая страница' })
  page: number;

  @Field(() => Int, { description: 'Количество на странице' })
  limit: number;
}
