import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from 'src/entities/publishers';
import { PublishersController } from './publishers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PublisherEntity])],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
