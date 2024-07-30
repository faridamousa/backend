import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './users';
import { FollowedAuthorsEntity } from './followed_authors';
import { BookAuthorsEntity } from './book_authors';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date_of_birth: Date;

  @Column()
  country: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;
  @Column()
  userId: number;

  @OneToMany(
    () => FollowedAuthorsEntity,
    (user) => user.author,
  )
  users: FollowedAuthorsEntity[];

  @OneToMany(() => BookAuthorsEntity, (book) => book.author)
  books: BookAuthorsEntity[];
}
