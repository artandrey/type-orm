import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from './author.entity';
import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column({ type: 'date' })
  publishDate: Date;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Author, author => author.books)
  author: Author;

  @ManyToOne(() => Genre, genre => genre.books)
  genre: Genre;
}
