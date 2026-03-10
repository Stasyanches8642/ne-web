import { Role } from '@prisma/client';

export class CreateUserDto {
  email: string;
  name: string;
  phone?: string;
  avatarUrl?: string;
  role?: Role;
}
