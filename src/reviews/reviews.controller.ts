import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateReviewDto,
  RemoveReviewDto,
  UpdateReviewDto,
} from './reviews.dto';
import { ReviewsService } from './reviews.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)

@ApiTags('/reviews')
@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  //get all reviews
  @Get('/reviews')
  async findAll() {
    return this.reviewsService.findAll();
  }

  //get a review
  @Get('/review/:id')
  async findOne(@Param('id') id: number) {
    return this.reviewsService.findOne(id);
  }

  //add new review
  @Post('/review/add')
  async create(@Body() review: CreateReviewDto) {
    return this.reviewsService.create(review);
  }

  //update review
  @Put('/review/edit')
  async update(@Param('id') id: number, review: UpdateReviewDto) {
    await this.reviewsService.update(id, review);
    return { message: 'review edited' };
  }

  //delete review
  @Delete('/review/delete')
  async delete(@Body() review: RemoveReviewDto) {
    await this.reviewsService.delete(review);
    return { message: 'review deleted' };
  }
}
