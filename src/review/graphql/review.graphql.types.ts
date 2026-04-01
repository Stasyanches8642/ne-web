import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Пользователь' })
export class UserType {
  @Field(() => Int, { description: 'ID пользователя' })
  id: number;

  @Field({ description: 'Имя пользователя' })
  name: string;

  @Field({ description: 'Email пользователя' })
  email: string;

  @Field({ nullable: true, description: 'Телефон пользователя' })
  phone?: string;

  @Field({ description: 'Роль пользователя' })
  role: string;
}

@ObjectType({ description: 'Отзыв о ресторане' })
export class ReviewType {
  @Field(() => Int, { description: 'ID отзыва' })
  id: number;

  @Field(() => Int, { description: 'Оценка от 1 до 5' })
  rating: number;

  @Field({ nullable: true, description: 'Текст отзыва' })
  text?: string;

  @Field({ description: 'Дата создания отзыва' })
  createdAt: Date;

  @Field(() => Int, { description: 'ID пользователя' })
  userId: number;

  @Field(() => UserType, { nullable: true, description: 'Автор отзыва' })
  user?: UserType;
}

@ObjectType({ description: 'Список отзывов с пагинацией' })
export class ReviewListType {
  @Field(() => [ReviewType], { description: 'Список отзывов' })
  data: ReviewType[];

  @Field(() => Int, { description: 'Общее количество отзывов' })
  total: number;

  @Field(() => Int, { description: 'Текущая страница' })
  page: number;

  @Field(() => Int, { description: 'Количество на странице' })
  limit: number;
}
