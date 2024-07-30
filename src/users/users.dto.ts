import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsDate()
  date_of_birth: Date;

  @IsString()
  role: string;
}

export class RemoveUserDto {
  @IsNumber()
  id: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
