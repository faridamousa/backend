import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateReviewDto,
  RemoveReviewDto,
  UpdateReviewDto,
} from './reviews.dto';
import { ReviewEntity } from 'src/entities/reviews';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  //create read list entry
  async create(createReviewDto: CreateReviewDto): Promise<void> {
    await this.reviewRepository.save({
      ...createReviewDto,
      read: { id: createReviewDto.readId },
    });
  }

  //find all reviews of a book
  async findAll(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({ relations: ['read'] });
  }

  //find a review
  async findOne(id: number): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['read'],
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  //update review
  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    await this.reviewRepository.update(id, updateReviewDto);
    return this.reviewRepository.findOne({ where: { id } });
  }

  //delete review
  async delete(id: RemoveReviewDto): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
