import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/users';
import { UsersRepository } from 'src/users/users.repository';
import { AuthorsRepository } from 'src/authors/authors.repository';
import { FollowedAuthorsRepository } from 'src/followed_authors/followed_authors.repository';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
