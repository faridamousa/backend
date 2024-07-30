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
import { BooksService } from './books.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto, RemoveBookDto, UpdateBookDto } from './books.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@ApiTags('/books')
@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  //get all books
  @Get('/book')
  async findAll() {
    return this.booksService.findAll();
  }

  //get a book
  @Get('/book/:id')
  async findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  //add new book
  @Post('/book/add')
  async create(@Body() book: CreateBookDto) {
    return this.booksService.create(book);
  }

  //update book
  @Put('/book/edit')
  async update(@Param('id') id: number, book: UpdateBookDto) {
    await this.booksService.update(id, book);
    return { message: 'book edited' };
  }

  //delete book
  @Delete('/book/delete')
  async delete(@Body() book: RemoveBookDto) {
    await this.booksService.delete(book);
    return { message: 'book deleted' };
  }

  //add in book editor
  @Post('/book/addBookEditor')
  async addBookEditor(
    @Param('bookId') bookId: number,
    @Param('editorId') editorId: number,
  ) {
    return this.booksService.addBookEditor(bookId, editorId);
  }

  // add in book author
  @Post('/book/addBookAuthor')
  async addBookAuthor(
    @Param('bookId') bookId: number,
    @Param('authorId') authorId: number,
  ) {
    return this.booksService.addBookAuthor(bookId, authorId);
  }
}
