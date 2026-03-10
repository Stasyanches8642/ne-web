export class CreateReviewDto {
  rating: number;
  text?: string;
  userId?: number;
  name?: string;
  [key: string]: unknown;
}
