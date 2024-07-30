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
import { AuthorsService } from './authors.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthorEntity } from 'src/entities/authors';
import {
  CreateAuthorDto,
  RemoveAuthorDto,
  UpdateAuthorDto,
} from './authors.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@ApiTags('/authors')
@Controller()
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  //get all authors
  @Get('/author')
  async findAll() {
    return this.authorService.findAll();
  }

  //get a author
  @Get('/author/:id')
  async findOne(@Param('id') id: number) {
    return this.authorService.findOne(id);
  }

  //add new author
  @Post('/author/add')
  async create(@Body() author: CreateAuthorDto) {
    return this.authorService.create(author);
  }

  //update author
  @Put('/author/edit')
  async update(@Param('id') id: number, author: UpdateAuthorDto) {
    await this.authorService.update(id, author);
    return { message: 'author edited' };
  }

  //delete author
  @Delete('/author/delete')
  async delete(@Body() author: RemoveAuthorDto) {
    await this.authorService.delete(author);
    return { message: 'author deleted' };
  }

}
