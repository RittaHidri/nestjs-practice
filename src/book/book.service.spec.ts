import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'Atomic Habits',
      price: 35,
      createdAt: new Date('2026-01-10'),
      updatedAt: new Date('2026-01-10'),
    },
    {
      id: 2,
      title: 'The Alchemist',
      price: 28,
      createdAt: new Date('2026-02-15'),
      updatedAt: new Date('2026-02-15'),
    },
    {
      id: 3,
      title: 'Clean Code',
      price: 65,
      createdAt: new Date('2026-03-20'),
      updatedAt: new Date('2026-03-20'),
    },
  ];

  private nextId = 4;

  create(createBookDto: CreateBookDto): Book {
    const now = new Date();

    const book: Book = {
      id: this.nextId++,
      title: createBookDto.title,
      price: createBookDto.price,
      createdAt: now,
      updatedAt: now,
    };

    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    const book = this.findOne(id);

    Object.assign(book, updateBookDto);
    book.updatedAt = new Date();

    return book;
  }

  remove(id: number): void {
    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new NotFoundException('Book not found');
    }

    this.books.splice(index, 1);
  }
}