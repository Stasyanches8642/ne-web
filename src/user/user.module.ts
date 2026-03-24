import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserApiController } from './user.api.controller';

@Module({
  controllers: [UserController, UserApiController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
