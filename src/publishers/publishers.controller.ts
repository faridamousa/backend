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
import {
  CreatePublisherDto,
  RemovePublisherDto,
  UpdatePublisherDto,
} from './publishers.dto';
import { PublishersService } from './publishers.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)

@ApiTags('/publishers')
@Controller()
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  //get all publishers
  @Get('/publishers')
  async findAll() {
    return this.publishersService.findAll();
  }

  //get a publisher
  @Get('/publisher/:id')
  async findOne(@Param('id') id: number) {
    return this.publishersService.findOne(id);
  }

  //add new publisher
  @Post('/publisher/add')
  async create(@Body() publisher: CreatePublisherDto) {
    return this.publishersService.create(publisher);
  }

  //update publisher
  @Put('/publisher/edit')
  async update(@Param('id') id: number, publisher: UpdatePublisherDto) {
    await this.publishersService.update(id, publisher);
    return { message: 'publisher edited' };
  }

  //delete publisher
  @Delete('/publisher/delete')
  async delete(@Body() publisher: RemovePublisherDto) {
    await this.publishersService.delete(publisher);
    return { message: 'publisher deleted' };
  }
}
