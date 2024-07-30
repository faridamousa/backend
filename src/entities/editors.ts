import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from './users';
import { PublisherEntity } from './publishers';
//import { BookEditorsEntity } from './book_editors';
import { BookEntity } from './books';
import { BookEditorsEntity } from './book_editors';

@Entity()
export class EditorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  role: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;
  @Column()
  userId: number;

  @ManyToOne(() => PublisherEntity, (publisher) => publisher.editors)
  publisher: PublisherEntity;

  @OneToMany(() => BookEditorsEntity, (book) => book.editor)
  books: BookEditorsEntity[];
}
