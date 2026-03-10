import { Hall, ReservationStatus } from '@prisma/client';

export class CreateReservationDto {
  date: Date;
  guestsCount: number;
  hall: Hall;
  specialRequests?: string;
  status?: ReservationStatus;
  userId: number;
}
