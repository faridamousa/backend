import { Module } from '@nestjs/common';
import { CurrentlyReadingService } from './currently_reading.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentlyReadingController } from './currently_reading.controller';
import { UserEntity } from 'src/entities/users';
import { BookEntity } from 'src/entities/books';
import { CurrentlyReadingEntity } from 'src/entities/currently_reading';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrentlyReadingEntity, UserEntity, BookEntity]),
  ],
  controllers: [CurrentlyReadingController],
  providers: [CurrentlyReadingService],
})
export class CurrentlyReadingModule {}
