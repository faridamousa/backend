import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateReadDto {
  @IsNumber()
  bookId: number;

  @IsNumber()
  userId: number;

  @IsDate()
  date_read: Date;
}

export class RemoveReadDto {
  @IsNumber()
  id: number;
}

export class UpdateReadDto extends PartialType(CreateReadDto) {}
