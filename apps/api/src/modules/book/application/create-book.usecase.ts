import { Inject, Injectable } from '@nestjs/common';
import { IBookRepository } from '../domain/book.repository.interface';
import { Book } from '../domain/book.entity';
import { CreateBookInput } from './create-book.dto';

@Injectable()
export class CreateBookUseCase {
  constructor(
    // 以前作成した Symbol を使って、インターフェースを注入してもらう
    @Inject(IBookRepository)
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(input: CreateBookInput): Promise<void> {
    // 1. ドメインエンティティの生成（ドメイン層のルールに従ってバリデーションが行われる）
    const book = Book.create({
      title: input.title,
      isbn: input.isbn,
      author: input.author,
      thumbnail: input.thumbnail,
      status: 'UNREAD', // 初期状態は「未読」というビジネスルール
      userId: input.userId,
    });

    // 2. リポジトリを介して永続化（保存）
    await this.bookRepository.save(book);
  }
}