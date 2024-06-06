import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Customer } from './entities/customer.entity';
import { Genre } from './entities/genre.entity';
import { Order } from './entities/order.entity';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Author, Book, Customer, Genre, Order],
      synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [],
})
export class AppModule implements OnModuleInit {
  private static readonly SHOULD_POPULATE = false;

  constructor(private readonly taskService: TaskService) {}

  async onModuleInit() {
    if (AppModule.SHOULD_POPULATE) {
      await this.taskService.populateDatabase();
    }
    await this.taskService.displayTablesData();
    await this.taskService.addRowsToTables();
    await this.taskService.runQueries();
  }
}
