import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookUseCase } from '../application/create-book.usecase';
import { CreateBookInput } from '../application/create-book.dto';

@Controller('books') // API のエンドポイントを /books に設定
export class BookController {
  constructor(
    // アプリケーション層のユースケースを注入
    private readonly createBookUseCase: CreateBookUseCase,
  ) {}

  @Post() // POST /books リクエストを処理
  async create(@Body() input: CreateBookInput): Promise<{ message: string }> {
    // ユースケースを呼び出して業務ロジックを実行
    await this.createBookUseCase.execute(input);

    return { message: '書籍が正常に登録されました' };
  }
}