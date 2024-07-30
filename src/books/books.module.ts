import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/books';
import { PublisherEntity } from 'src/entities/publishers';
import { WantToReadEntity } from 'src/entities/want_to_read';
import { CurrentlyReadingEntity } from 'src/entities/currently_reading';
import { ReadEntity } from 'src/entities/read';
import { EditorEntity } from 'src/entities/editors';
import { BookEditorsEntity } from 'src/entities/book_editors';
import { AuthorEntity } from 'src/entities/authors';
import { BookAuthorsEntity } from 'src/entities/book_authors';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      PublisherEntity,
      WantToReadEntity,
      CurrentlyReadingEntity,
      ReadEntity,
      EditorEntity,
      BookEditorsEntity,
      AuthorEntity,
      BookAuthorsEntity,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
