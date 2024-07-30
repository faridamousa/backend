import { Module } from '@nestjs/common';
import { WantToReadService } from './want_to_read.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from 'src/entities/publishers';
import { WantToReadController } from './want_to_read.controller';
import { WantToReadEntity } from 'src/entities/want_to_read';
import { UserEntity } from 'src/entities/users';
import { BookEntity } from 'src/entities/books';

@Module({
  imports: [
    TypeOrmModule.forFeature([WantToReadEntity, UserEntity, BookEntity]),
  ],
  controllers: [WantToReadController],
  providers: [WantToReadService],
})
export class WantToReadModule {}
