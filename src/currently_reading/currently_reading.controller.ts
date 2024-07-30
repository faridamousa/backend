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

import { CurrentlyReadingService } from './currently_reading.service';
import {
  CreateCurrentlyReadingDto,
  RemoveCurrentlyReadingDto,
  UpdateCurrentlyReadingDto,
} from './currently_reading.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)

@ApiTags('/currentlyReading')
@Controller()
export class CurrentlyReadingController {
  constructor(
    private readonly currentlyReadingService: CurrentlyReadingService,
  ) {}

  @Post('/currentlyReading/add')
  async addBookToCurrentlyReadingList(
    @Body() createCurrentlyReadingDto: CreateCurrentlyReadingDto,
  ) {
    return this.currentlyReadingService.addBookToCurrentlyReadingList(
      createCurrentlyReadingDto,
    );
  }

  @Get('/currentlyReading')
  async findAll() {
    return this.currentlyReadingService.findAll();
  }

  @Get('/currentlyReading/:id')
  async findOne(@Param('id') id: number) {
    return this.currentlyReadingService.findOne(id);
  }

  @Delete('/currentlyReading/delete')
  async removeBookFromCurrentlyReadingList(
    @Body() removeCurrentlyReadingDto: RemoveCurrentlyReadingDto,
  ) {
    return this.currentlyReadingService.removeBookFromCurrentlyReadingList(
      removeCurrentlyReadingDto,
    );
  }

  @Put('/currentlyReading/edit/:id')
  async updateCurrentlyReadingEntry(
    @Param('id') id: number,
    @Body() updateCurrentlyReadingDto: UpdateCurrentlyReadingDto,
  ) {
    return this.currentlyReadingService.updateCurrentlyReadingEntry(
      id,
      updateCurrentlyReadingDto,
    );
  }
}
