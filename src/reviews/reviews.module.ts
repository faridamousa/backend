import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/entities/reviews';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReadEntity } from 'src/entities/read';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, ReadEntity])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
