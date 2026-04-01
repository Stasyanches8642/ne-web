import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional, IsBoolean, Min, Max, IsPositive } from 'class-validator';

@InputType({ description: 'Данные для создания блюда' })
export class CreateDishInput {
  @Field({ description: 'Название блюда' })
  @IsString()
  name: string;

  @Field({ nullable: true, description: 'Описание блюда' })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Float, { description: 'Цена в рублях' })
  @IsNumber()
  @IsPositive()
  price: number;

  @Field({ nullable: true, description: 'Состав блюда' })
  @IsOptional()
  @IsString()
  ingredients?: string;

  @Field({ nullable: true, description: 'Подходит ли для вегетарианцев' })
  @IsOptional()
  @IsBoolean()
  isVegetarian?: boolean;

  @Field({ nullable: true, description: 'URL изображения' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field(() => Int, { description: 'ID категории' })
  @IsNumber()
  categoryId: number;
}

@InputType({ description: 'Данные для обновления блюда' })
export class UpdateDishInput {
  @Field({ nullable: true, description: 'Название блюда' })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => Float, { nullable: true, description: 'Цена в рублях' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @Field({ nullable: true, description: 'Доступно ли блюдо' })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

@InputType({ description: 'Данные для создания отзыва' })
export class CreateReviewInput {
  @Field(() => Int, { description: 'Оценка от 1 до 5' })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @Field({ nullable: true, description: 'Текст отзыва' })
  @IsOptional()
  @IsString()
  text?: string;

  @Field({ nullable: true, description: 'Имя автора' })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => Int, { nullable: true, description: 'ID пользователя' })
  @IsOptional()
  @IsNumber()
  userId?: number;
}

@InputType({ description: 'Данные для обновления отзыва' })
export class UpdateReviewInput {
  @Field(() => Int, { nullable: true, description: 'Оценка от 1 до 5' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @Field({ nullable: true, description: 'Текст отзыва' })
  @IsOptional()
  @IsString()
  text?: string;
}
