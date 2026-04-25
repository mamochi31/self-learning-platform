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
        isbn: book.isbn,
        title: book.title,
        status: book.status,
      },
      create: {
        id: book.id,
        isbn: book.isbn,
        title: book.title,
        status: book.status,
        userId: book.userId,
      },
    });
  }

  async findAll(): Promise<Book[]> {
    const prismaBooks = await this.prisma.book.findMany();
    // Prisma のモデルからドメインエンティティに変換して返す
    return prismaBooks.map((p) =>
      Book.create(
        {
          isbn: p.isbn ?? undefined,
          title: p.title,
          author: p.author ?? undefined,
          thumbnail: p.thumbnail ?? undefined,
          status: p.status,
          userId: p.userId,
        },
        p.id,
      ),
    );
  }

  async findById(id: string): Promise<Book | null> {
    const data = await this.prisma.book.findUnique({ where: { id } });
    if (!data) return null;

    // 取得したデータをドメインエンティティに復元
    return Book.create(
      {
        isbn: data.isbn ?? undefined,
        title: data.title,
        status: data.status,
        userId: data.userId,
      },
      data.id,
    );
  }

  // 他の findByUserId, delete メソッドも同様に実装...
}
