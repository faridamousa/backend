import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BookEntity } from './books';
import { EditorEntity } from './editors';

@Entity()
export class BookEditorsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.editors)
  book: BookEntity;

  @ManyToOne(() => EditorEntity, (editor) => editor.books)
  editor: EditorEntity;
}
