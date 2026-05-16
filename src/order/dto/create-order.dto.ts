import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  totalPrice: number;
  status?: OrderStatus;
  comment?: string;
  userId: number;
}
