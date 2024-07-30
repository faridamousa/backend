import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class signInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
