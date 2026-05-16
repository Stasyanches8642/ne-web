import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReviewService } from './review.service';
import {
  ReviewType,
  ReviewListType,
  UserType,
} from './graphql/review.graphql.types';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from '../graphql/graphql.inputs';

@Resolver(() => ReviewType)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => ReviewListType, {
    description: 'Получить список всех отзывов с пагинацией',
  })
  async reviews(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    const all = await this.reviewService.findAll();
    const total = all.length;
    const data = all.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit };
  }

  @Query(() => ReviewType, {
    nullable: true,
    description: 'Получить отзыв по ID',
  })
  async review(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.findOne(id);
  }

  @Mutation(() => ReviewType, {
    description: 'Оставить новый отзыв о ресторане',
  })
  async leaveReview(
    @Args('input') input: CreateReviewInput,
  ): Promise<ReviewType> {
    const dto = input as CreateReviewInput & { [key: string]: unknown };
    return (await this.reviewService.create(
      dto,
    )) as unknown as Promise<ReviewType>;
  }

  @Mutation(() => ReviewType, {
    description: 'Обновить текст или оценку отзыва',
  })
  async editReview(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateReviewInput,
  ): Promise<ReviewType> {
    const dto = input as UpdateReviewInput & { [key: string]: unknown };
    return this.reviewService.update(id, dto) as Promise<ReviewType>;
  }

  @Mutation(() => Boolean, { description: 'Удалить отзыв' })
  async deleteReview(@Args('id', { type: () => Int }) id: number) {
    await this.reviewService.remove(id);
    return true;
  }

  @ResolveField(() => UserType, {
    nullable: true,
    description: 'Автор отзыва',
    complexity: 1,
  })
  async user(@Parent() review: ReviewType): Promise<UserType | null> {
    const reviewWithUser = review as ReviewType & { user?: UserType };
    if (reviewWithUser.user) return reviewWithUser.user;
    const full = await this.reviewService.findOne(review.id);
    const fullWithUser = full as typeof full & { user?: UserType };
    return fullWithUser?.user ?? null;
  }
}
