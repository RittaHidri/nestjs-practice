import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto {
  title?: string;
  price?: number;
}