import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EditorEntity } from './editors';
import { BookEntity } from './books';

@Entity()
export class PublisherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @OneToMany(() => EditorEntity, (editor) => editor.publisher)
  editors: EditorEntity[];

  @OneToMany(() => BookEntity, (book) => book.publisher)
  books: BookEntity[];
}
