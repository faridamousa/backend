import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './users';
import { BookEntity } from './books';
import { ReviewEntity } from './reviews';

@Entity()
export class ReadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.wantToReadList)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.read)
  book: BookEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_read: Date;

  @OneToMany(() => ReviewEntity, (review) => review.read)
  reviews: ReviewEntity[];
}
