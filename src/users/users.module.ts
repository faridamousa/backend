import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AuthorEntity } from 'src/entities/authors';
import { FollowedAuthorsEntity } from 'src/entities/followed_authors';
import { AuthorsRepository } from 'src/authors/authors.repository';
import { FollowedAuthorsRepository } from 'src/followed_authors/followed_authors.repository';
import { Repository } from 'typeorm';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    AuthorsModule,
    TypeOrmModule.forFeature([UserEntity, FollowedAuthorsEntity]),
  ],
  controllers: [UsersController],
  providers: [
    AuthorsRepository,
    UsersRepository,
    FollowedAuthorsRepository,
    UsersService,
  ],
  exports: [
    AuthorsRepository,
    UsersRepository,
    FollowedAuthorsRepository,
    UsersService,
  ],
})
export class UsersModule {}
