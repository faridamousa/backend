import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
@ApiBearerAuth('Bearer')
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync('x'),
    };
  }
}
