import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateWantToReadDto {
  @IsNumber()
  bookId: number;

  @IsNumber()
  userId: number;

  @IsDate()
  date_added: Date;
}

export class RemoveWantToReadDto {
  @IsNumber()
  id: number;
}

export class UpdateWantToReadDto extends PartialType(CreateWantToReadDto) {}
