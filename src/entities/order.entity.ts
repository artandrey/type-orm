import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Customer } from './customer.entity';
import { Book } from './book.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  orderDate: Date;

  @Column({ type: 'decimal' })
  totalAmount: number;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];
}
