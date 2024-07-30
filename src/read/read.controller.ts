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
import { CreateReadDto, RemoveReadDto, UpdateReadDto } from './read.dto';
import { ReadService } from './read.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)

@ApiTags('/read')
@Controller()
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Post('/read/add')
  async addBookToReadList(@Body() createReadDto: CreateReadDto) {
    return this.readService.addBookToReadList(createReadDto);
  }

  @Get('/read')
  async findAll() {
    return this.readService.findAll();
  }

  @Get('/read/:id')
  async findOne(@Param('id') id: number) {
    return this.readService.findOne(id);
  }

  @Delete('/read/delete')
  async removeBookFromReadList(@Body() removeReadDto: RemoveReadDto) {
    return this.readService.removeBookFromReadList(removeReadDto);
  }

  @Put('/read/update/:id')
  async updateReadEntry(
    @Param('id') id: number,
    @Body() updateReadDto: UpdateReadDto,
  ) {
    return this.readService.updateReadEntry(id, updateReadDto);
  }
}
