import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/users';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {}
