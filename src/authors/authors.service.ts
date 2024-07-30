import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/entities/authors';
import { Repository } from 'typeorm';
import {
  CreateAuthorDto,
  RemoveAuthorDto,
  UpdateAuthorDto,
} from './authors.dto';
import { UsersRepository } from 'src/users/users.repository';
import { BookAuthorsEntity } from 'src/entities/book_authors';
import { FollowedAuthorsEntity } from 'src/entities/followed_authors';
import { AuthorsRepository } from './authors.repository';

@Injectable()
export class AuthorsService {
  constructor(
    //@InjectRepository(AuthorEntity)
    private authorRepository: AuthorsRepository,
  ) {}

  //create author
  async create(createAuthorDto: CreateAuthorDto): Promise<void> {
    await this.authorRepository.save({
      ...createAuthorDto,
      user: { id: createAuthorDto.userId },
    });
  }

  //find all authors
  async findAll(): Promise<AuthorEntity[]> {
    return this.authorRepository.find();
  }

  //find author
  async findOne(id: number): Promise<AuthorEntity> {
    const author = this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException('author not found');
    }
    return author;
  }

  //update author
  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorEntity> {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.authorRepository.findOne({ where: { id } });
  }

  //delete author
  async delete(id: RemoveAuthorDto): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
