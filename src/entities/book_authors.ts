import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AuthorEntity } from './authors';
import { BookEntity } from './books';

@Entity()
export class BookAuthorsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.authors)
  book: BookEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;
}
