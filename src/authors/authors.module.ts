import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/entities/authors';
import { UserEntity } from 'src/entities/users';
import { AuthorsRepository } from './authors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorsController],
  providers: [AuthorsRepository, AuthorsService],
  exports: [AuthorsRepository],
})
export class AuthorsModule {}
