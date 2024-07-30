import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/users';
import { BookEntity } from 'src/entities/books';
import { CurrentlyReadingEntity } from 'src/entities/currently_reading';
import {
  CreateCurrentlyReadingDto,
  RemoveCurrentlyReadingDto,
  UpdateCurrentlyReadingDto,
} from './currently_reading.dto';

@Injectable()
export class CurrentlyReadingService {
  constructor(
    @InjectRepository(CurrentlyReadingEntity)
    private currentlyReadingRepository: Repository<CurrentlyReadingEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  // add book to list
  async addBookToCurrentlyReadingList(
    createCurrentlyReadingDto: CreateCurrentlyReadingDto,
  ): Promise<void> {
    const { userId, bookId } = createCurrentlyReadingDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!user || !book) {
      throw new NotFoundException('User or Book not found');
    }
    await this.currentlyReadingRepository.save({
      ...createCurrentlyReadingDto,
      user: { id: createCurrentlyReadingDto.userId },
      book: { id: createCurrentlyReadingDto.bookId },
      date_added: new Date(), // Set the current date
    });
  }

  //get all books
  async findAll(): Promise<CurrentlyReadingEntity[]> {
    return this.currentlyReadingRepository.find({
      relations: ['users', 'books'],
    });
  }

  // get a book
  async findOne(id: number): Promise<CurrentlyReadingEntity> {
    const currentlyReadingEntry = await this.currentlyReadingRepository.findOne(
      {
        where: { id },
        relations: ['users', 'books'],
      },
    );
    if (!currentlyReadingEntry) {
      throw new NotFoundException('Currently reading list entry not found');
    }
    return currentlyReadingEntry;
  }

  //delete book from currently reading list
  async removeBookFromCurrentlyReadingList(
    removeCurrentlyReadingDto: RemoveCurrentlyReadingDto,
  ): Promise<void> {
    const { id } = removeCurrentlyReadingDto;
    await this.currentlyReadingRepository.delete(id);
  }

  //update currently reading
  async updateCurrentlyReadingEntry(
    id: number,
    updateCurrentlyReadingDto: UpdateCurrentlyReadingDto,
  ): Promise<CurrentlyReadingEntity> {
    await this.currentlyReadingRepository.update(id, updateCurrentlyReadingDto);
    return this.currentlyReadingRepository.findOne({
      where: { id },
      relations: ['books', 'users'],
    });
  }
}
