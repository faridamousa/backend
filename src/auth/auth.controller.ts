import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { signInDto } from './auth.dto';
@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user/login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(AuthGuard)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }
}
