import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Customer } from './entities/customer.entity';
import { Genre } from './entities/genre.entity';
import { Order } from './entities/order.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [Author, Book, Customer, Genre, Order],
    synchronize: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
