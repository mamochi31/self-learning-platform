import { Module } from '@nestjs/common';
import { BookController } from './presentation/book.controller';
import { CreateBookUseCase } from './application/create-book.usecase';
import { IBookRepository } from './domain/book.repository.interface';
import { PrismaBookRepository } from './infrastructure/prisma-book.repository';

@Module({
  controllers: [BookController], // プレゼンテーション層の登録
  providers: [
    CreateBookUseCase, // アプリケーション層の登録
    {
      // 依存性の逆転（DIP）の設定
      provide: IBookRepository,      // 「IBookRepository」という目印に対して
      useClass: PrismaBookRepository, // 「PrismaBookRepository」という実体を提供する
    },
  ],
})
export class BookModule {}