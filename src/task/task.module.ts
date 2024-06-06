import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
import { Customer } from 'src/entities/customer.entity';
import { Genre } from 'src/entities/genre.entity';
import { Order } from 'src/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book, Customer, Genre, Order])],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
