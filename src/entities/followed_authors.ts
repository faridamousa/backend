import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './users';
import { AuthorEntity } from './authors';

@Entity()
export class FollowedAuthorsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.authors)
  user: UserEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.users)
  author: AuthorEntity;
}
