import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsDate()
  publish_date: Date;

  @IsString()
  synopsis: string;

  @IsString()
  genre: string;

  @IsNumber()
  page_count: number;

  @IsNumber()
  publisherId: number;
}

export class RemoveBookDto {
  @IsNumber()
  id: number;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
