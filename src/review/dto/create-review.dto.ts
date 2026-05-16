import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: 'Отличный ресторан!' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiPropertyOptional({ example: 'Иван' })
  @IsOptional()
  @IsString()
  name?: string;

  [key: string]: unknown;
}
