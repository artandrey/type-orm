import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
import { Customer } from 'src/entities/customer.entity';
import { Genre } from 'src/entities/genre.entity';
import { Order } from 'src/entities/order.entity';
import { DataSource } from 'typeorm';


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'postgres',
  entities: [Author, Book, Genre, Order, Customer],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false, // Set to false to use migrations
});

export default AppDataSource;