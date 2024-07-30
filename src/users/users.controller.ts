import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, RemoveUserDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)

@ApiTags('/users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all users
  @Get('/users')
  async findAll() {
    return this.usersService.findAll();
  }

  //get a user
  @Get('/user/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  //add new user
  @Post('/user/add')
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  //update user
  @Put('/user/edit')
  async update(@Param('id') id: number, user: UpdateUserDto) {
    await this.usersService.update(id, user);
    return { message: 'user edited' };
  }

  //delete user
  @Delete('/user/delete')
  async delete(@Body() user: RemoveUserDto) {
    await this.usersService.delete(user);
    return { message: 'user deleted' };
  }

  // add in followed author
  @Post('/user/addFollowedAuthor')
  async addFollowedAuthor(
    @Param('userId') userId: number,
    @Param('authorId') authorId: number,
  ) {
    return this.usersService.addFollowedAuthor(userId, authorId);
  }
}
