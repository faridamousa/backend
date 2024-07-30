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
export class CurrentlyReadingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.wantToReadList)
  user: UserEntity;
  
  @ManyToOne(() => BookEntity, (book) => book.currently_reading)
  book: BookEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_added: Date;
}
