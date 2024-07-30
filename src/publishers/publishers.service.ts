import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePublisherDto,
  RemovePublisherDto,
  UpdatePublisherDto,
} from './publishers.dto';
import { PublisherEntity } from 'src/entities/publishers';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublisherEntity)
    private publisherRepository: Repository<PublisherEntity>,
  ) {}

  //create publisher
  async create(createPublisherDto: CreatePublisherDto): Promise<void> {
    await this.publisherRepository.save({
      ...createPublisherDto,
    });
  }

  //find all publisher
  async findAll(): Promise<PublisherEntity[]> {
    return this.publisherRepository.find();
  }

  //find publisher
  async findOne(id: number): Promise<PublisherEntity> {
    const publisher = this.publisherRepository.findOne({ where: { id } });
    if (!publisher) {
      throw new NotFoundException('publisher not found');
    }
    return publisher;
  }

  //update publisher
  async update(
    id: number,
    updatePublisherDto: UpdatePublisherDto,
  ): Promise<PublisherEntity> {
    await this.publisherRepository.update(id, updatePublisherDto);
    return this.publisherRepository.findOne({ where: { id } });
  }

  //delete publisher
  async delete(id: RemovePublisherDto): Promise<void> {
    await this.publisherRepository.delete(id);
  }
}
