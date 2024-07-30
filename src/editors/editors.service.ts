import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateEditorDto,
  RemoveEditorDto,
  UpdateEditorDto,
} from './editors.dto';
import { EditorEntity } from 'src/entities/editors';

@Injectable()
export class EditorsService {
  constructor(
    @InjectRepository(EditorEntity)
    private editorRepository: Repository<EditorEntity>,
  ) {}

  //create editor
  async create(createEditorDto: CreateEditorDto): Promise<void> {
    await this.editorRepository.save({
      ...createEditorDto,
      publisher: { id: createEditorDto.publisherId },
    });
  }

  //find all editor
  async findAll(): Promise<EditorEntity[]> {
    return this.editorRepository.find();
  }

  //find editor
  async findOne(id: number): Promise<EditorEntity> {
    const editor = this.editorRepository.findOne({ where: { id } });
    if (!editor) {
      throw new NotFoundException('editor not found');
    }
    return editor;
  }

  //update editor
  async update(
    id: number,
    updateEditorDto: UpdateEditorDto,
  ): Promise<EditorEntity> {
    await this.editorRepository.update(id, updateEditorDto);
    return this.editorRepository.findOne({ where: { id } });
  }

  //delete editor
  async delete(id: RemoveEditorDto): Promise<void> {
    await this.editorRepository.delete(id);
  }
}
