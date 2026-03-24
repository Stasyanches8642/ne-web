import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateDishDto {
  @ApiProperty({ example: 'Русский борщ' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Традиционный красный борщ со сметаной' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Свинина, свёкла, морковь' })
  @IsOptional()
  @IsString()
  ingredients?: string;

  @ApiProperty({ example: 400 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({ example: '/htdocs/img/meals/Russian_borscht.png' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isVegetarian?: boolean;

  @ApiPropertyOptional({ example: 350 })
  @IsOptional()
  @IsInt()
  @Min(0)
  weight?: number;

  @ApiPropertyOptional({ example: 250 })
  @IsOptional()
  @IsInt()
  @Min(0)
  calories?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  categoryId: number;
}
