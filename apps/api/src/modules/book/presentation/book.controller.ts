import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateBookUseCase } from '../application/create-book.usecase';
import { CreateBookInput } from '../application/create-book.dto';
import { FindAllBooksUseCase } from '../application/find-all-books.usecase';

@Controller('books') // API のエンドポイントを /books に設定
export class BookController {
  constructor(
    // アプリケーション層のユースケースを注入
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly findAllBooksUseCase: FindAllBooksUseCase,
  ) {}

  @Post()
  async create(@Body() input: CreateBookInput): Promise<{ message: string }> {
    // ユースケースを呼び出して業務ロジックを実行
    await this.createBookUseCase.execute(input);

    return { message: '書籍が正常に登録されました' };
  }

  @Get()
  async findAll() {
    return await this.findAllBooksUseCase.execute();
  }
}
