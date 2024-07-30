import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { PublisherEntity } from './publishers';
import { WantToReadEntity } from './want_to_read';
import { CurrentlyReadingEntity } from './currently_reading';
import { ReadEntity } from './read';
import { BookAuthorsEntity } from './book_authors';
//import { BookEditorsEntity } from './book_editors';
import { EditorEntity } from './editors';
import { BookEditorsEntity } from './book_editors';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publish_date: Date;

  @Column()
  synopsis: string;

  @Column()
  genre: string;

  @Column()
  page_count: number;

  @ManyToOne(() => PublisherEntity, (publisher) => publisher.editors)
  publisher: PublisherEntity;

  @OneToMany(() => WantToReadEntity, (want_to_read) => want_to_read.book)
  want_to_read: WantToReadEntity[];

  @OneToMany(
    () => CurrentlyReadingEntity,
    (currently_reading) => currently_reading.book,
  )
  currently_reading: CurrentlyReadingEntity[];

  @OneToMany(() => ReadEntity, (read) => read.book)
  read: ReadEntity[];

  @OneToMany(() => BookAuthorsEntity, (author) => author.book)
  authors: BookAuthorsEntity[];

  @OneToMany(() => BookEditorsEntity, (editor) => editor.book)
  editors: BookEditorsEntity[];
}
