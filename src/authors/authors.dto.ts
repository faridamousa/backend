import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsDate()
  date_of_birth: Date;

  @IsString()
  country: string;

  @IsNumber()
  userId: number;
}

export class RemoveAuthorDto {
  @IsNumber()
  id: number;
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
