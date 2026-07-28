import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

import {
  BorrowRecord,
  BorrowStatus,
} from '../borrows/entities/borrow-record.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(BorrowRecord)
    private readonly borrowRepository: Repository<BorrowRecord>,
  ) {}

  async getStats() {
    const totalUsers =
      await this.userRepository.count();

    const totalBooks =
      await this.bookRepository.count();

    const borrowedBooks =
      await this.borrowRepository.count({
        where: {
          status: BorrowStatus.BORROWED,
        },
      });

    const availableBooks =
      await this.bookRepository
        .createQueryBuilder('book')
        .select(
          'SUM(book.availableCopies)',
          'total',
        )
        .getRawOne();

    return {
      totalUsers,
      totalBooks,
      borrowedBooks,
      availableBooks: Number(
        availableBooks?.total || 0,
      ),
    };
  }
}