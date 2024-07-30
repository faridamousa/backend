import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FollowedAuthorsEntity } from './followed_authors';
import { WantToReadEntity } from './want_to_read';
import { CurrentlyReadingEntity } from './currently_reading';
import { ReadEntity } from './read';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  date_of_birth: Date;

  @Column()
  role: string;

  @OneToMany(() => FollowedAuthorsEntity, (author) => author.user)
  authors: FollowedAuthorsEntity[];

  @OneToMany(() => WantToReadEntity, (wantToRead) => wantToRead.user)
  wantToReadList: WantToReadEntity[];

  @OneToMany(() => CurrentlyReadingEntity, (currentRead) => currentRead.user)
  currentReadList: CurrentlyReadingEntity[];

  @OneToMany(() => ReadEntity, (read) => read.user)
  readList: ReadEntity[];
}
