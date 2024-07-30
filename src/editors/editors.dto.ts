import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEditorDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  phone: number;

  @IsString()
  role: string;

  @IsNumber()
  publisherId: number;
}

export class RemoveEditorDto {
  @IsNumber()
  id: number;
}

export class UpdateEditorDto extends PartialType(CreateEditorDto) {}
