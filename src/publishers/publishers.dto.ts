import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsNumber()
  phone: number;
}

export class RemovePublisherDto {
  @IsNumber()
  id: number;
}

export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {}
