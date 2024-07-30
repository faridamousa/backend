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

@Entity()
export class WantToReadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.wantToReadList)
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => BookEntity, (book) => book.want_to_read)
  book: BookEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_added: Date;
}
