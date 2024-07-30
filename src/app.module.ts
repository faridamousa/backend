import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/authors';
import { BookAuthorsEntity } from './entities/book_authors';
import { BookEditorsEntity } from './entities/book_editors';
import { BookEntity } from './entities/books';
import { CurrentlyReadingEntity } from './entities/currently_reading';
import { EditorEntity } from './entities/editors';
import { FollowedAuthorsEntity } from './entities/followed_authors';
import { PublisherEntity } from './entities/publishers';
import { ReadEntity } from './entities/read';
import { ReviewEntity } from './entities/reviews';
import { UserEntity } from './entities/users';
import { WantToReadEntity } from './entities/want_to_read';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { EditorsModule } from './editors/editors.module';
import { PublishersModule } from './publishers/publishers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WantToReadModule } from './want_to_read/want_to_read.module';
import { CurrentlyReadingModule } from './currently_reading/currently_reading.module';
import { ReadModule } from './read/read.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
//host: host.internal.docker
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          AuthorEntity,
          BookAuthorsEntity,
          BookEditorsEntity,
          BookEntity,
          CurrentlyReadingEntity,
          EditorEntity,
          FollowedAuthorsEntity,
          PublisherEntity,
          ReadEntity,
          ReviewEntity,
          UserEntity,
          WantToReadEntity,
        ],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthorsModule,
    BooksModule,
    EditorsModule,
    PublishersModule,
    WantToReadModule,
    CurrentlyReadingModule,
    ReadModule,
    ReviewsModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
