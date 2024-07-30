import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  review_text: string;

  @IsNumber()
  rating: number;

  @IsDate()
  review_date: Date;

  @IsNumber()
  readId: number;
}

export class RemoveReviewDto {
  @IsNumber()
  id: number;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
