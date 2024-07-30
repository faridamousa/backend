import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReadEntity } from './read';

@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReadEntity, (read) => read.reviews)
  read: ReadEntity;

  @Column()
  review_text: string;

  @Column()
  rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  review_date: Date;
}
