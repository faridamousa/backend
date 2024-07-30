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
import { EditorsService } from './editors.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateEditorDto,
  RemoveEditorDto,
  UpdateEditorDto,
} from './editors.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)

@ApiTags('/editors')
@Controller()
export class EditorsController {
  constructor(private readonly editorsService: EditorsService) {}

  //get all editors
  @Get('/editor')
  async findAll() {
    return this.editorsService.findAll();
  }

  //get a editor
  @Get('/editor/:id')
  async findOne(@Param('id') id: number) {
    return this.editorsService.findOne(id);
  }

  //add new editor
  @Post('/editor/add')
  async create(@Body() editor: CreateEditorDto) {
    return this.editorsService.create(editor);
  }

  //update editor
  @Put('/editor/edit')
  async update(@Param('id') id: number, editor: UpdateEditorDto) {
    await this.editorsService.update(id, editor);
    return { message: 'editor edited' };
  }

  //delete editor
  @Delete('/editor/delete')
  async delete(@Body() editor: RemoveEditorDto) {
    await this.editorsService.delete(editor);
    return { message: 'editor deleted' };
  }
}
