import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCurrentlyReadingDto {
  @IsNumber()
  bookId: number;

  @IsNumber()
  userId: number;

  @IsDate()
  date_added: Date;
}

export class RemoveCurrentlyReadingDto {
  @IsNumber()
  id: number;
}

export class UpdateCurrentlyReadingDto extends PartialType(
  CreateCurrentlyReadingDto,
) {}
