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
  CreateWantToReadDto,
  RemoveWantToReadDto,
  UpdateWantToReadDto,
} from './want_to_read.dto';
import { WantToReadService } from './want_to_read.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@ApiTags('/wantToRead')
@Controller()
export class WantToReadController {
  constructor(private readonly wantToReadService: WantToReadService) {}

  @Post('/wantToRead/add')
  async addBookToWantToReadList(
    @Body() createWantToReadDto: CreateWantToReadDto,
  ) {
    return this.wantToReadService.addBookToWantToReadList(createWantToReadDto);
  }

  @Get('/wantToRead')
  async findAll() {
    return this.wantToReadService.findAll();
  }

  @Get('/wantToRead/:id')
  async findOne(@Param('id') id: number) {
    return this.wantToReadService.findOne(id);
  }

  @Delete('/wantToRead/delete')
  async removeBookFromWantToReadList(
    @Body() removeWantToReadDto: RemoveWantToReadDto,
  ) {
    return this.wantToReadService.removeBookFromWantToReadList(
      removeWantToReadDto,
    );
  }

  @Put('/wantToRead/update/:id')
  async updateWantToReadEntry(
    @Param('id') id: number,
    @Body() updateWantToReadDto: UpdateWantToReadDto,
  ) {
    return this.wantToReadService.updateWantToReadEntry(
      id,
      updateWantToReadDto,
    );
  }
}
