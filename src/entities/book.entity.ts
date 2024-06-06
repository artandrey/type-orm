import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Author } from './author.entity';
import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryColumn()
  @Column()
  isbn: string;

  @Column()
  title: string;

  @Column({ type: 'date' })
  publishDate: Date;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre;
}
