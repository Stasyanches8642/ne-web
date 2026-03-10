export class CreateDishDto {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable?: boolean;
  weight?: number;
  calories?: number;
  categoryId: number;
}
