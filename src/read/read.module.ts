import { Module } from '@nestjs/common';
import { ReadService } from './read.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from 'src/entities/publishers';
import { ReadController } from './read.controller';
import { WantToReadEntity } from 'src/entities/want_to_read';
import { UserEntity } from 'src/entities/users';
import { BookEntity } from 'src/entities/books';
import { ReadEntity } from 'src/entities/read';

@Module({
  imports: [TypeOrmModule.forFeature([ReadEntity, UserEntity, BookEntity])],
  controllers: [ReadController],
  providers: [ReadService],
})
export class ReadModule {}
