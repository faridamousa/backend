import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto, RemoveBookDto, UpdateBookDto } from './books.dto';
import { BookEntity } from 'src/entities/books';
import { BookEditorsEntity } from 'src/entities/book_editors';
import { EditorEntity } from 'src/entities/editors';
import { AuthorEntity } from 'src/entities/authors';
import { BookAuthorsEntity } from 'src/entities/book_authors';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(EditorEntity)
    private editorRepository: Repository<EditorEntity>,
    @InjectRepository(BookEditorsEntity)
    private bookEditorRepository: Repository<BookEditorsEntity>,
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookAuthorsEntity)
    private bookAuthorRepository: Repository<BookAuthorsEntity>,
  ) {}

  //create book
  async create(createBookDto: CreateBookDto): Promise<void> {
    await this.bookRepository.save({
      ...createBookDto,
    });
  }

  //find all books
  async findAll(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  //find book
  async findOne(id: number): Promise<BookEntity> {
    const book = this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('book not found');
    }
    return book;
  }

  //update book
  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    await this.bookRepository.update(id, updateBookDto);
    return this.bookRepository.findOne({ where: { id } });
  }

  //delete book
  async delete(id: RemoveBookDto): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async addBookEditor(bookId: number, editorId: number): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    const editor = await this.editorRepository.findOne({
      where: { id: editorId },
    });
    await this.bookEditorRepository.insert({ book, editor });
  }

  async addBookAuthor(bookId: number, authorId: number): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
    });
    await this.bookAuthorRepository.insert({ book, author });
  }
}
