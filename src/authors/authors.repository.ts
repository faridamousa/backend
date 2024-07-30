import { AuthorEntity } from 'src/entities/authors';
import { Repository } from 'typeorm';

export class AuthorsRepository extends Repository<AuthorEntity> {}
