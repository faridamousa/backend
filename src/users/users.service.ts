import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, In, Repository } from 'typeorm';
import { CreateUserDto, RemoveUserDto, UpdateUserDto } from './users.dto';
import { UserEntity } from 'src/entities/users';
import { UsersRepository } from './users.repository';
import { AuthorEntity } from 'src/entities/authors';
import { FollowedAuthorsEntity } from 'src/entities/followed_authors';
import { AuthorsRepository } from 'src/authors/authors.repository';
import { FollowedAuthorsRepository } from 'src/followed_authors/followed_authors.repository';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(UserEntity)
    // private userRepository,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    //@InjectRepository(AuthorEntity)
    // private authorRepository: AuthorsRepository,
    // //@InjectRepository(FollowedAuthorsEntity)
    // private followedAuthorRepository: FollowedAuthorsRepository,
  ) {}

  //create user
  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.save({
      ...createUserDto,
    });
  }

  //find all users
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  //find user
  async findOne(id: number): Promise<UserEntity> {
    console.log('1111111');
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async findOneByUsername(username: string): Promise<UserEntity> {
    console.log('2222222');

    return this.userRepository.findOne({ where: { username } });
  }

  //update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  //delete user
  async delete(id: RemoveUserDto): Promise<void> {
    await this.userRepository.delete(id);
  }

  // add followed authors
  async addFollowedAuthor(userId: number, authorId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    // const author = await this.authorRepository.findOne({
    //   where: { id: authorId },
    // });
    // await this.followedAuthorRepository.insert({ user, author });
  }
}
