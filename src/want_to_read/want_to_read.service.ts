import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateWantToReadDto,
  RemoveWantToReadDto,
  UpdateWantToReadDto,
} from './want_to_read.dto';
import { WantToReadEntity } from 'src/entities/want_to_read';
import { UserEntity } from 'src/entities/users';
import { BookEntity } from 'src/entities/books';

@Injectable()
export class WantToReadService {
  constructor(
    @InjectRepository(WantToReadEntity)
    private wantToReadRepository: Repository<WantToReadEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  // add book to list
  async addBookToWantToReadList(
    createWantToReadDto: CreateWantToReadDto,
  ): Promise<void> {
    const { userId, bookId } = createWantToReadDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!user || !book) {
      throw new NotFoundException('User or Book not found');
    }
    await this.wantToReadRepository.save({
      ...createWantToReadDto,
      user: { id: createWantToReadDto.userId },
      book: { id: createWantToReadDto.bookId },
      date_added: new Date(), // Set the current date
    });
  }

  //get all books
  async findAll(): Promise<WantToReadEntity[]> {
    return this.wantToReadRepository.find({ relations: ['users', 'books'] });
  }

  // get a book
  async findOne(id: number): Promise<WantToReadEntity> {
    const wantToReadEntry = await this.wantToReadRepository.findOne({
      where: { id },
      relations: ['users', 'books'],
    });
    if (!wantToReadEntry) {
      throw new NotFoundException('Want to read list entry not found');
    }
    return wantToReadEntry;
  }

  //delete book from want to read list
  async removeBookFromWantToReadList(
    removeWantToReadDto: RemoveWantToReadDto,
  ): Promise<void> {
    const { id } = removeWantToReadDto;
    await this.wantToReadRepository.delete(id);
  }

  //update want to read
  async updateWantToReadEntry(
    id: number,
    updateWantToReadDto: UpdateWantToReadDto,
  ): Promise<WantToReadEntity> {
    await this.wantToReadRepository.update(id, updateWantToReadDto);
    return this.wantToReadRepository.findOne({
      where: { id },
      relations: ['books', 'users'],
    });
  }
}
