import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }
  private book: Book[] = [
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
  {
    id: 4,
    title: 'The Pragmatic Programmer',
    price: 70,
    createdAt: new Date('2026-04-05'),
    updatedAt: new Date('2026-04-05'),
  },
  {
    id: 5,
    title: 'Rich Dad Poor Dad',
    price: 32,
    createdAt: new Date('2026-05-12'),
    updatedAt: new Date('2026-05-12'),
  },
];

  findAll() {
    return this.book;
  }

  findOne(id: number) {
    const book = this.book.find((book) => book.id === id);
    if (!book) {
      throw new BadRequestException(`Book with id ${id} not found`);
    }
    return { message: "book found", book: book };
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const bookIndex = this.book.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new BadRequestException(`Book with id ${id} not found`);
    }
    this.book[bookIndex] = { ...this.book[bookIndex], ...updateBookDto };
    return { message: "book updated", book: this.book[bookIndex] }; 
  }

  remove(id: number) {
    const bookIndex = this.book.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new BadRequestException(`Book with id ${id} not found`);
    }
    const removedBook = this.book.splice(bookIndex, 1)[0];
    return { message: "book removed", book: removedBook };
  }
}
