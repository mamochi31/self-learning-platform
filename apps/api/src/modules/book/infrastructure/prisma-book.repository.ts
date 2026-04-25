import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../domain/book.repository.interface';
import { Book } from '../domain/book.entity';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PrismaBookRepository implements IBookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(book: Book): Promise<void> {
    // ドメインモデルを Prisma のデータ形式に変換（マッピング）して保存
    await this.prisma.book.upsert({
      where: { id: book.id || '' },
      update: {
        title: book.title,
        status: book.status,
        isbn: book.isbn,
      },
      create: {
        id: book.id,
        title: book.title,
        status: book.status,
        isbn: book.isbn,
        userId: book.userId,
      },
    });
  }

  async findById(id: string): Promise<Book | null> {
    const data = await this.prisma.book.findUnique({ where: { id } });
    if (!data) return null;

    // 取得したデータをドメインエンティティに復元
    return Book.create({
      title: data.title,
      isbn: data.isbn ?? undefined,
      status: data.status as any,
      userId: data.userId,
    }, data.id);
  }

  // 他の findByUserId, delete メソッドも同様に実装...
}