import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReadDto, RemoveReadDto, UpdateReadDto } from './read.dto';
import { UserEntity } from 'src/entities/users';
import { BookEntity } from 'src/entities/books';
import { ReadEntity } from 'src/entities/read';

@Injectable()
export class ReadService {
  constructor(
    @InjectRepository(ReadEntity)
    private readRepository: Repository<ReadEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  // add book to list
  async addBookToReadList(createReadDto: CreateReadDto): Promise<void> {
    const { userId, bookId } = createReadDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!user || !book) {
      throw new NotFoundException('User or Book not found');
    }
    await this.readRepository.save({
      ...createReadDto,
      user: { id: createReadDto.userId },
      book: { id: createReadDto.bookId },
      date_read: new Date(), // Set the current date
    });
  }

  //get all books
  async findAll(): Promise<ReadEntity[]> {
    return this.readRepository.find({ relations: ['users', 'books'] });
  }

  // get a book
  async findOne(id: number): Promise<ReadEntity> {
    const readListEntry = await this.readRepository.findOne({
      where: { id },
      relations: ['users', 'books'],
    });
    if (!readListEntry) {
      throw new NotFoundException('Read list entry not found');
    }
    return readListEntry;
  }

  //delete book from want to read list
  async removeBookFromReadList(removeReadDto: RemoveReadDto): Promise<void> {
    const { id } = removeReadDto;
    await this.readRepository.delete(id);
  }

  //update want to read
  async updateReadEntry(
    id: number,
    updateReadDto: UpdateReadDto,
  ): Promise<ReadEntity> {
    await this.readRepository.update(id, updateReadDto);
    return this.readRepository.findOne({
      where: { id },
      relations: ['books', 'users'],
    });
  }
}
