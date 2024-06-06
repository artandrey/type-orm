import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
import { Customer } from 'src/entities/customer.entity';
import { Genre } from 'src/entities/genre.entity';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async populateDatabase() {
    // Delete existing data
    await this.orderRepository.delete({});
    await this.bookRepository.delete({});
    await this.authorRepository.delete({});
    await this.genreRepository.delete({});
    await this.customerRepository.delete({});

    const authors = [
      {
        name: 'Тарас Шевченко',
        bio: 'Український поет і письменник',
        birthdate: '1814-03-09',
        nationality: 'Ukrainian',
      },
      {
        name: 'Леся Українка',
        bio: 'Українська поетеса',
        birthdate: '1871-02-25',
        nationality: 'Ukrainian',
      },
      {
        name: 'Іван Франко',
        bio: 'Український письменник',
        birthdate: '1856-08-27',
        nationality: 'Ukrainian',
      },
      {
        name: 'Mark Zuckerberg',
        bio: 'American computer programmer and internet entrepreneur',
        birthdate: '1984-05-14',
        nationality: 'American',
      },
      {
        name: 'Elon Musk',
        bio: 'American entrepreneur and business magnate',
        birthdate: '1971-06-28',
        nationality: 'American',
      },
      {
        name: 'Robert C. Martin',
        bio: 'American software engineer and author',
        birthdate: '1952-12-05',
        nationality: 'American',
      },
    ];

    const genres = [
      { name: 'Поезія', description: 'Вірші та поетичні твори' },
      { name: 'Проза', description: 'Романи та новели' },
      {
        name: 'Programming',
        description: 'Books about programming and software development',
      },
    ];

    const books = [
      {
        title: 'Кобзар',
        isbn: '9789660359252',
        publishDate: '1840-04-18',
        price: 100.0,
        description: 'Збірка поезій',
        authorName: 'Тарас Шевченко',
        genreName: 'Поезія',
      },
      {
        title: 'Лісова пісня',
        isbn: '9789660342118',
        publishDate: '1911-11-07',
        price: 150.0,
        description: 'Драматична поема',
        authorName: 'Леся Українка',
        genreName: 'Проза',
      },
      {
        title: 'Захар Беркут',
        isbn: '9789660333339',
        publishDate: '1883-10-01',
        price: 200.0,
        description: 'Історична повість',
        authorName: 'Іван Франко',
        genreName: 'Проза',
      },
      {
        title: 'The Facebook Effect',
        isbn: '9781439102129',
        publishDate: '2010-02-16',
        price: 250.0,
        description:
          'The inside story of the company that is connecting the world',
        authorName: 'Mark Zuckerberg',
        genreName: 'Programming',
      },
      {
        title: 'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future',
        isbn: '9780062301253',
        publishDate: '2015-05-19',
        price: 200.0,
        description: 'Biography of Elon Musk',
        authorName: 'Elon Musk',
        genreName: 'Programming',
      },
      {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        isbn: '9780132350884',
        publishDate: '2008-08-11',
        price: 350.0,
        description: 'Guide to writing clean code',
        authorName: 'Robert C. Martin',
        genreName: 'Programming',
      },
    ];

    const customers = [
      {
        name: 'Іван Петров',
        email: 'ivan.petrov@example.com',
        password: 'password123',
        address: 'Київ, Україна',
        phoneNumber: '+380501234567',
      },
      {
        name: 'Марія Іванова',
        email: 'maria.ivanova@example.com',
        password: 'password123',
        address: 'Львів, Україна',
        phoneNumber: '+380502345678',
      },
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        address: 'New York, USA',
        phoneNumber: '+15551234567',
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        address: 'Los Angeles, USA',
        phoneNumber: '+15557654321',
      },
    ];

    await this.authorRepository.save(authors);
    await this.genreRepository.save(genres);

    for (const book of books) {
      const author = await this.authorRepository.findOne({
        where: { name: book.authorName },
      });
      const genre = await this.genreRepository.findOne({
        where: { name: book.genreName },
      });
      await this.bookRepository.save({
        ...book,
        author,
        genre,
      });
    }

    await this.customerRepository.save(customers);

    const orders = [
      {
        orderDate: '2023-01-01',
        totalAmount: 300.0,
        customerEmail: 'ivan.petrov@example.com',
        bookIsbns: ['9789660359252', '9789660342118'],
      },
      {
        orderDate: '2023-02-01',
        totalAmount: 400.0,
        customerEmail: 'maria.ivanova@example.com',
        bookIsbns: ['9789660333339', '9781439102129'],
      },
      {
        orderDate: '2023-03-01',
        totalAmount: 550.0,
        customerEmail: 'john.doe@example.com',
        bookIsbns: ['9780062301253', '9780132350884'],
      },
    ];

    for (const order of orders) {
      const customer = await this.customerRepository.findOne({
        where: { email: order.customerEmail },
      });
      const books = await this.bookRepository.findByIds(order.bookIsbns);
      await this.orderRepository.save({
        orderDate: order.orderDate,
        totalAmount: order.totalAmount,
        customer,
        books,
      });
    }
  }

  async displayTablesData() {
    const authors = await this.authorRepository.find();
    const genres = await this.genreRepository.find();
    const books = await this.bookRepository.find({
      relations: ['author', 'genre'],
    });
    const customers = await this.customerRepository.find();
    const orders = await this.orderRepository.find({
      relations: ['customer', 'books'],
    });

    console.table(authors);
    console.table(genres);
    console.table(books);
    console.table(customers);
    console.table(orders);
  }

  async addRowsToTables() {
    await this.authorRepository.save([
      {
        name: 'Михайло Коцюбинський',
        bio: 'Український письменник, прозаїк',
        birthdate: '1864-09-17',
        nationality: 'Ukrainian',
      },
      {
        name: 'Іван Нечуй-Левицький',
        bio: 'Український письменник, драматург',
        birthdate: '1838-12-15',
        nationality: 'Ukrainian',
      },
    ]);

    await this.genreRepository.save([
      {
        name: 'Історична проза',
        description: 'Художні твори на історичні теми',
      },
      { name: 'Фантастика', description: 'Книги про фантастичні події' },
    ]);

    const authors = await this.authorRepository.find();
    const genres = await this.genreRepository.find();
    await this.bookRepository.save([
      {
        title: 'Тіні забутих предків',
        isbn: '978-966-03-1111-1',
        publishDate: '1887-01-01',
        price: 180.0,
        description: 'Роман',
        author: authors.find(
          (author) => author.name === 'Михайло Коцюбинський',
        ),
        genre: genres.find((genre) => genre.name === 'Історична проза'),
      },
      {
        title: 'Чорна рада',
        isbn: '978-966-03-2222-2',
        publishDate: '1861-02-02',
        price: 150.0,
        description: 'Історичний роман',
        author: authors.find(
          (author) => author.name === 'Іван Нечуй-Левицький',
        ),
        genre: genres.find((genre) => genre.name === 'Історична проза'),
      },
    ]);

    await this.customerRepository.save([
      {
        name: 'Олександр Петров',
        email: 'oleksandr.petrov@example.com',
        password: 'password123',
        address: 'Львів, Україна',
        phoneNumber: '+380509876543',
      },
      {
        name: 'Вікторія Іванова',
        email: 'viktoria.ivanova@example.com',
        password: 'password123',
        address: 'Київ, Україна',
        phoneNumber: '+380507654321',
      },
    ]);

    const customers = await this.customerRepository.find();
    const books = await this.bookRepository.find();
    await this.orderRepository.save([
      {
        orderDate: '2023-04-01',
        totalAmount: 330.0,
        customer: customers.find(
          (customer) => customer.name === 'Олександр Петров',
        ),
        books: [books.find((book) => book.title === 'Тіні забутих предків')],
      },
      {
        orderDate: '2023-05-01',
        totalAmount: 280.0,
        customer: customers.find(
          (customer) => customer.name === 'Вікторія Іванова',
        ),
        books: [books.find((book) => book.title === 'Чорна рада')],
      },
    ]);
  }

  async runQueries() {
    // Join Query
    const booksWithAuthors = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.genre', 'genre')
      .getMany();
    console.table(booksWithAuthors);

    // Filter Query
    const expensiveBooks = await this.bookRepository
      .createQueryBuilder('book')
      .where('book.price > :price', { price: 150 })
      .getMany();
    console.table(expensiveBooks);

    // Aggregate Query
    const totalBooksPrice = await this.bookRepository
      .createQueryBuilder('book')
      .select('SUM(book.price)', 'total')
      .getRawOne();
    console.table(totalBooksPrice);
  }

  async cascadeDelete() {
    await this.populateDatabase();
    await this.displayCustomersTable();
    await this.displayOrdersTable();

    const customerToDelete = await this.customerRepository.findOne({
      where: { name: 'Іван Петров' },
    });
    await this.customerRepository.remove(customerToDelete);

    await this.displayCustomersTable();
    await this.displayOrdersTable();
  }

  async displayCustomersTable() {
    const customers = await this.customerRepository.find();
    console.table(customers);
  }

  async displayOrdersTable() {
    const orders = await this.orderRepository.find({ relations: ['customer'] });
    console.table(orders);
  }

  async updateEmails() {
    await this.populateDatabase();

    await this.displayCustomersTable();

    const customersToUpdate = [
      {
        email: 'ivan.petrov@example.com',
        newPassword: 'newPassword123',
        newEmail: 'newemail1@example.com',
      },
      {
        email: 'maria.ivanova@example.com',
        newPassword: 'newPassword456',
        newEmail: 'newemail2@example.com',
      },
    ];

    for (const customerData of customersToUpdate) {
      const customerToUpdate = await this.customerRepository.findOne({
        where: {
          email: customerData.email,
        },
      });
      if (customerToUpdate) {
        customerToUpdate.password = customerData.newPassword;
        customerToUpdate.email = customerData.newEmail;
        await this.customerRepository.save(customerToUpdate);
      }
    }

    await this.displayCustomersTable();
  }

  async eager() {
    const programmingGenre = await this.genreRepository.findOne({
      where: { name: 'Programming' },
    });
    console.log(programmingGenre);
  }
}
