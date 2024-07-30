import { Module } from '@nestjs/common';
import { EditorsService } from './editors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/books';
import { PublisherEntity } from 'src/entities/publishers';
import { WantToReadEntity } from 'src/entities/want_to_read';
import { CurrentlyReadingEntity } from 'src/entities/currently_reading';
import { ReadEntity } from 'src/entities/read';
import { EditorsController } from './editors.controller';
import { EditorEntity } from 'src/entities/editors';

@Module({
  imports: [TypeOrmModule.forFeature([EditorEntity, PublisherEntity])],
  controllers: [EditorsController],
  providers: [EditorsService],
})
export class EditorsModule {}
