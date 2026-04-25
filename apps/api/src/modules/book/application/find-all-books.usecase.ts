import { Inject } from '@nestjs/common';
import { IBookRepository } from '../domain/book.repository.interface';

export class FindAllBooksUseCase {
  constructor(
    @Inject(IBookRepository)
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute() {
    return await this.bookRepository.findAll();
  }
}
